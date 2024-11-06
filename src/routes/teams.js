const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("teams.create", "/", async (ctx) => {
  try {
    const { name, representativeId, tournamentId } = ctx.request.body;

    // Validar que el nombre esté presente
    if (!name) {
      ctx.throw(400, "Team name is required");
    }

    // Verificar que el representante exista
    const representative = await ctx.orm.User.findByPk(representativeId);
    if (!representative) {
      ctx.throw(404, "Representative not found");
    }

    // Verificar que el torneo exista
    const tournament = await ctx.orm.Tournament.findByPk(tournamentId);
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }

    // Crear el equipo si todas las validaciones pasaron
    const team = await ctx.orm.Team.create(ctx.request.body);
    ctx.body = team;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.post("teams.add_player", "/:id/add_player", async (ctx) => {
  try {
    const { user_id, team_id } = ctx.request.body;

    // Verificar que el equipo exista
    const team = await ctx.orm.Team.findByPk(team_id);
    if (!team) {
      ctx.throw(404, "Team not found");
    }

    // Verificar que el usuario exista
    const user = await ctx.orm.User.findByPk(user_id);
    if (!user) {
      ctx.throw(404, "User not found");
    }

    // Verificar si el jugador ya está en el equipo
    const existingPlayer = await ctx.orm.Player.findOne({
      where: {
        teamId: team_id,
        userId: user_id,
      },
    });

    if (existingPlayer) {
      ctx.throw(400, "User is already a player in this team");
    }

    // Crear el jugador y asociarlo al equipo
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
          as: "Players", // Especifica el alias aquí
          include: [
            {
              model: ctx.orm.User,
              attributes: ["id", "name", "email"], // Solo incluir los atributos necesarios
            },
          ],
        },
      ],
    });

    if (!team) {
      ctx.throw(404, "Team not found");
    }

    ctx.body = team.Players.map((player) => player.User); // Retornar solo los usuarios asociados a los jugadores
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

    // Verificar que el equipo exista
    const team = await ctx.orm.Team.findByPk(teamId);
    if (!team) {
      ctx.throw(404, "Team not found");
    }

    // Actualizar solo los campos enviados en el cuerpo de la solicitud
    await team.update(ctx.request.body);

    ctx.body = team; // Retornar el equipo actualizado
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("teams.by_captain", "/captain/:user_id", async (ctx) => {
  try {
    const { user_id } = ctx.params;

    // Verificar si el usuario es un capitán
    const user = await ctx.orm.User.findByPk(user_id);
    if (!user) {
      ctx.throw(404, "User not found");
    }
    if (user.role !== "Capitan") {
      ctx.throw(400, "User is not a captain");
    }

    // Obtener el equipo donde el usuario es el representante (capitán)
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

module.exports = router;
