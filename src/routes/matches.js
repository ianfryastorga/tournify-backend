const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("matches.create", "/", async (ctx) => {
  try {
    const { date, time, team1, team2, tournamentId } = ctx.request.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!date || !time || !team1 || !team2 || !tournamentId) {
      ctx.throw(
        400,
        "All fields (date, time, team1, team2, tournamentId) are required"
      );
    }

    // Verificar que `team1` y `team2` sean equipos distintos
    if (team1 === team2) {
      ctx.throw(400, "Teams must be different for a match");
    }

    // Verificar que el equipo 1 exista
    const teamOne = await ctx.orm.Team.findByPk(team1);
    if (!teamOne) {
      ctx.throw(404, "Team 1 not found");
    }

    // Verificar que el equipo 2 exista
    const teamTwo = await ctx.orm.Team.findByPk(team2);
    if (!teamTwo) {
      ctx.throw(404, "Team 2 not found");
    }

    // Verificar que el torneo exista
    const tournament = await ctx.orm.Tournament.findByPk(tournamentId);
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }

    // Crear el partido si todas las validaciones pasaron
    const match = await ctx.orm.Match.create(ctx.request.body);
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
    const match = await ctx.orm.Match.findByPk(ctx.params.id);
    if (!match) {
      ctx.throw(404);
    }
    ctx.body = match;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.patch("matches.update", "/:id", async (ctx) => {
  try {
    const matchId = ctx.params.id;
    const { date, time, team1, team2, tournamentId } = ctx.request.body;

    // Verificar que el partido exista
    const match = await ctx.orm.Match.findByPk(matchId);
    if (!match) {
      ctx.throw(404, "Match not found");
    }

    // Si se proporciona `team1` o `team2`, verificar que ambos sean distintos
    if (team1 && team2 && team1 === team2) {
      ctx.throw(400, "Teams must be different for a match");
    }

    // Validar la existencia de `team1` si se incluye en la solicitud
    if (team1) {
      const teamOne = await ctx.orm.Team.findByPk(team1);
      if (!teamOne) {
        ctx.throw(404, "Team 1 not found");
      }
    }

    // Validar la existencia de `team2` si se incluye en la solicitud
    if (team2) {
      const teamTwo = await ctx.orm.Team.findByPk(team2);
      if (!teamTwo) {
        ctx.throw(404, "Team 2 not found");
      }
    }

    // Validar la existencia del torneo si se incluye `tournamentId` en la solicitud
    if (tournamentId) {
      const tournament = await ctx.orm.Tournament.findByPk(tournamentId);
      if (!tournament) {
        ctx.throw(404, "Tournament not found");
      }
    }

    // Actualizar solo los campos proporcionados en el cuerpo de la solicitud
    await match.update(ctx.request.body);

    ctx.body = match; // Retornar el partido actualizado
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

module.exports = router;
