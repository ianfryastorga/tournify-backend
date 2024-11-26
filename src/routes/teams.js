const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("teams.create", "/", async (ctx) => {
  try {
    const { name, captainId, tournamentId } = ctx.request.body;

    if (!name) {
      ctx.throw(400, "Team name is required");
    }
    const captain = await ctx.orm.User.findByPk(captainId);
    if (!captain) {
      ctx.throw(404, "Captain not found");
    }

    if (captain.role !== "Capitan") {
      ctx.throw(400, "User is not a captain");
    }

    const tournament = await ctx.orm.Tournament.findByPk(tournamentId);
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }

    const team = await ctx.orm.Team.create(ctx.request.body);
    ctx.body = team;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.post("teams.add_player", "/add_player", async (ctx) => {
  try {
    const { user_id, team_id } = ctx.request.body;

    const team = await ctx.orm.Team.findByPk(team_id);
    if (!team) {
      ctx.throw(404, "Team not found");
    }

    const user = await ctx.orm.User.findByPk(user_id);
    if (!user) {
      ctx.throw(404, "User not found");
    }

    const existingPlayer = await ctx.orm.Player.findOne({
      where: {
        teamId: team_id,
        userId: user_id,
      },
    });

    if (existingPlayer) {
      ctx.throw(400, "User is already a player in this team");
    }

    const newPlayer = await ctx.orm.Player.create({
      teamId: team_id,
      userId: user_id,
    });

    ctx.body = newPlayer;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("teams.players", "/:id/players", async (ctx) => {
  try {
    const team = await ctx.orm.Team.findByPk(ctx.params.id, {
      include: [
        {
          model: ctx.orm.Player,
          as: "Players",
          attributes: ["id", "goals", "teamId", "userId"], // Incluye explícitamente los atributos de Player
          include: [
            {
              model: ctx.orm.User,
              attributes: ["id", "name", "email"], // Atributos del usuario
            },
          ],
        },
      ],
    });

    if (!team) {
      ctx.throw(404, "Team not found");
    }

    ctx.body = team.Players.map((player) => ({
      id: player.User.id,
      name: player.User.name,
      email: player.User.email,
      goals: player.goals || 0, // Aseguramos que se incluya la columna `goals`
    }));
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.throw(400, error);
  }
});

router.get("teams.list", "/", async (ctx) => {
  try {
    const teams = await ctx.orm.Team.findAll();
    ctx.body = teams;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("teams.show", "/:id", async (ctx) => {
  try {
    const team = await ctx.orm.Team.findByPk(ctx.params.id);
    if (!team) {
      ctx.throw(404);
    }
    ctx.body = team;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.patch("teams.update", "/:id", async (ctx) => {
  try {
    const teamId = ctx.params.id;

    const team = await ctx.orm.Team.findByPk(teamId);
    if (!team) {
      ctx.throw(404, "Team not found");
    }

    await team.update(ctx.request.body);

    ctx.body = team;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});


router.get("teams.by_captain", "/captain/:user_id", async (ctx) => {
  try {
    const { user_id } = ctx.params;

    // Buscar el usuario por ID
    const user = await ctx.orm.User.findByPk(user_id);
    if (!user) {
      ctx.status = 201;
      ctx.body = { message: "User not found" };
      return;
    }

    // Verificar si el usuario es un capitán
    if (user.role !== "Capitan") {
      ctx.status = 201;
      ctx.body = { message: "User is not a captain" };
      return;
    }

    // Buscar el equipo asociado al capitán
    const team = await ctx.orm.Team.findOne({
      where: { captainId: user_id },
      include: [
        {
          model: ctx.orm.Player,
          as: "Players",
          include: [
            {
              model: ctx.orm.User,
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
    });

    if (!team) {
      ctx.status = 201;
      ctx.body = { message: "Team not found for this captain" };
      return;
    }

    // Transformar los datos del equipo para incluir goles
    const teamWithGoals = {
      ...team.toJSON(),
      Players: team.Players.map((player) => ({
        id: player.User.id,
        name: player.User.name,
        email: player.User.email,
        goals: player.goals || 0, // Incluir el atributo `goals` de Player
      })),
    };

    ctx.status = 200;
    ctx.body = teamWithGoals;
  } catch (error) {
    console.error(error);
    ctx.throw(400, { message: "An error occurred", error: error.message });
  }
});

router.post("teams.remove_player", "/remove_player", async (ctx) => {
  try {
    const { user_id, team_id } = ctx.request.body;
    const team = await ctx.orm.Team.findByPk(team_id);
    if (!team) {
      ctx.throw(404, "Team not found");
    }
    const player = await ctx.orm.Player.findOne({
      where: {
        teamId: team_id,
        userId: user_id,
      },
    });
    if (!player) {
      ctx.throw(404, "Player not found in this team");
    }
    await player.destroy();
    ctx.body = { message: "Player removed from team" };
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("teams.by_tournament_slug", "/tournamentSlug/:slug", async (ctx) => {
  try {
    const slug = ctx.params.slug;
    console.log("ID", slug);
    const tournament = await ctx.orm.Tournament.findOne({
      where: { id: slug },
    });
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }
    const teams = await ctx.orm.Team.findAll({
      where: { tournamentId: tournament.id },
    });
    console.log(teams);

    ctx.body = teams;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get(
  "teams.byTournamentSlug",
  "/tournamentSlug/accepted/:slug",
  async (ctx) => {
    try {
      const { slug } = ctx.params;
      const tournament = await ctx.orm.Tournament.findOne({
        where: { id: slug },
      });
      if (!tournament) {
        ctx.throw(404, "Tournament not found");
      }
      const acceptedRegistrations = await ctx.orm.TeamRegistration.findAll({
        where: {
          tournamentSlug: slug,
          status: "Aceptado",
        },
      });
      const teamIds = acceptedRegistrations.map((reg) => reg.teamId);
      const teams = await ctx.orm.Team.findAll({
        where: { id: teamIds },
      });
      ctx.body = teams;
      ctx.status = 200;
    } catch (error) {
      ctx.throw(
        400,
        `Error fetching accepted teams by tournament: ${error.message}`
      );
    }
  }
);

module.exports = router;
