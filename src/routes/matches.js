const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("matches.create", "/", async (ctx) => {
  try {
    const { date, time, team1, team2, tournamentId, result, status } = ctx.request.body;

    if (!date || !time || !team1 || !team2 || !tournamentId) {
      ctx.throw(
        400,
        "All fields (date, time, team1, team2, tournamentId) are required"
      );
    }

    if (team1 === team2) {
      ctx.throw(400, "Teams must be different for a match");
    }

    const teamOne = await ctx.orm.Team.findOne({ where: { name: team1 } });
    if (!teamOne) {
      ctx.throw(404, "Team 1 not found");
    }

    const teamTwo = await ctx.orm.Team.findOne({ where: { name: team2 } });
    if (!teamTwo) {
      ctx.throw(404, "Team 2 not found");
    }

    const tournament = await ctx.orm.Tournament.findByPk(tournamentId);
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }

    const match = await ctx.orm.Match.create({
      date,
      time,
      team1: teamOne.id,
      team2: teamTwo.id,
      tournamentId,
      result,
      status,
    });
    ctx.body = match;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("matches.list", "/", async (ctx) => {
  try {
    const matches = await ctx.orm.Match.findAll();
    ctx.body = matches;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("matches.show", "/:id", async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(ctx.params.id, {
      include: [
        {
          model: ctx.orm.Event,
          as: "Events",
          include: [
            {
              model: ctx.orm.Player,
              as: "Player",
              include: [
                {
                  model: ctx.orm.User,
                  attributes: ["id", "name", "email"],
                },
              ],
            },
            {
              model: ctx.orm.Team,
              as: "Team",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: ctx.orm.Team,
          as: "Team1", // Usar el alias definido para el equipo 1
          attributes: ["id", "name"],
        },
        {
          model: ctx.orm.Team,
          as: "Team2", // Usar el alias definido para el equipo 2
          attributes: ["id", "name"],
        },
      ],
    });

    if (!match) {
      ctx.throw(404, "Match not found");
    }

    const plainMatch = match.toJSON();

    // Transformar los eventos para incluir solo los detalles relevantes
    plainMatch.Events = plainMatch.Events.map((event) => ({
      id: event.id,
      type: event.type,
      minute: event.minute,
      team: event.Team ? { id: event.Team.id, name: event.Team.name } : null,
      player: event.Player
        ? {
          id: event.Player.User.id,
          name: event.Player.User.name,
          email: event.Player.User.email,
        }
        : null,
    }));

    ctx.body = plainMatch;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.throw(400, error);
  }
});

router.patch("matches.update", "/:id", async (ctx) => {
  try {
    const matchId = ctx.params.id;
    const { date, time, team1, team2, tournamentId } = ctx.request.body;

    const match = await ctx.orm.Match.findByPk(matchId);
    if (!match) {
      ctx.throw(404, "Match not found");
    }

    if (team1 && team2 && team1 === team2) {
      ctx.throw(400, "Teams must be different for a match");
    }

    if (team1) {
      const teamOne = await ctx.orm.Team.findByPk(team1);
      if (!teamOne) {
        ctx.throw(404, "Team 1 not found");
      }
    }

    if (team2) {
      const teamTwo = await ctx.orm.Team.findByPk(team2);
      if (!teamTwo) {
        ctx.throw(404, "Team 2 not found");
      }
    }

    if (tournamentId) {
      const tournament = await ctx.orm.Tournament.findByPk(tournamentId);
      if (!tournament) {
        ctx.throw(404, "Tournament not found");
      }
    }

    await match.update(ctx.request.body);

    ctx.body = match;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.post("matches.add_event", "/:id/add_event", async (ctx) => {
  try {
    const { id: matchId } = ctx.params;
    const { type, minute, playerId, teamId } = ctx.request.body;

    // Verificar que el partido exista
    const match = await ctx.orm.Match.findByPk(matchId);
    if (!match) {
      ctx.throw(404, "Match not found");
    }

    // Verificar que el jugador exista
    const player = await ctx.orm.Player.findByPk(playerId);
    if (!player) {
      ctx.throw(404, "Player not found");
    }

    // Verificar que el equipo exista
    const team = await ctx.orm.Team.findByPk(teamId);
    if (!team) {
      ctx.throw(404, "Team not found");
    }

    // Crear el evento
    const event = await ctx.orm.Event.create({
      type,
      minute,
      matchId,
      playerId,
      teamId,
    });

    // Si el evento es un gol, incrementar los goles del jugador
    if (type.toLowerCase() === "gol") {
      player.goals += 1;
      await player.save();
    }

    ctx.body = {
      message: "Event added successfully",
      event,
    };
    ctx.status = 201;
  } catch (error) {
    console.log(error);
    ctx.throw(400, error);
  }
});

module.exports = router;
