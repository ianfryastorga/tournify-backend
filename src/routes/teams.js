const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("teams.create", "/", async (ctx) => {
  try {
    const { name, representativeId, tournamentId } = ctx.request.body;

    if (!name) {
      ctx.throw(400, "Team name is required");
    }
    const representative = await ctx.orm.User.findByPk(representativeId);
    if (!representative) {
      ctx.throw(404, "Representative not found");
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
      ctx.throw(404, "Team not found");
    }

    ctx.body = team.Players.map((player) => player.User); 
    ctx.status = 200;
  } catch (error) {
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

    const user = await ctx.orm.User.findByPk(user_id);
    if (!user) {
      ctx.throw(404, "User not found");
    }
    if (user.role !== "Capitan") {
      ctx.throw(400, "User is not a captain");
    }

    const team = await ctx.orm.Team.findOne({
      where: { representativeId: user_id },
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
      ctx.throw(404, "Team not found for this captain");
    }

    ctx.body = team;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
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
        const { slug } = ctx.params;
        const tournament = await ctx.orm.Tournament.findOne({ where: { slug } });
        if (!tournament) {
            ctx.throw(404, "Tournament not found");
        }
        const teams = await ctx.orm.Team.findAll({
            where: { tournamentId: tournament.id },
        });

        ctx.body = teams;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

router.get("teams.byTournamentSlug", "/tournamentSlug/accepted/:slug", async (ctx) => {
    try {
        const { slug } = ctx.params;
        const tournament = await ctx.orm.Tournament.findOne({ where: { slug } });
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
        ctx.throw(400, `Error fetching accepted teams by tournament: ${error.message}`);
    }
});

module.exports = router;
