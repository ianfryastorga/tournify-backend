// matches.js

const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

// Crear un nuevo partido
router.post("matches.create", "/", async (ctx) => {
  try {
    const { date, time, team1, team2, tournamentId, result, status } = ctx.request.body;

    const match = await ctx.orm.Match.create({
      date,
      time,
      team1,         // Asumiendo que team1 es el ID del equipo 1
      team2,         // Asumiendo que team2 es el ID del equipo 2
      tournamentId,  // Asumiendo que tournamentId es el ID del torneo
      result,
      status,
    });
    ctx.body = match;
    ctx.status = 201;
  } catch (error) {
    console.error("Error al crear el partido:", error);
    ctx.throw(400, error.message || "Error al crear el partido");
  }
});

// Listar todos los partidos
router.get("matches.list", "/", async (ctx) => {
  try {
    const matches = await ctx.orm.Match.findAll();
    ctx.body = matches;
    ctx.status = 200;
  } catch (error) {
    console.error("Error al listar los partidos:", error);
    ctx.throw(400, error.message || "Error al listar los partidos");
  }
});

// Obtener partido por ID
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
          as: "Team1", // Alias para team1
          attributes: ["id", "name"],
        },
        {
          model: ctx.orm.Team,
          as: "Team2", // Alias para team2
          attributes: ["id", "name"],
        },
      ],
    });

    if (!match) {
      ctx.throw(404, "Match not found");
    }

    const plainMatch = match.toJSON();

    // Transformar eventos para incluir solo detalles relevantes
    plainMatch.Events = plainMatch.Events.map((event) => ({
      id: event.id,
      type: event.type,
      minute: event.minute,
      team: event.Team ? { id: event.Team.id, name: event.Team.name } : null,
      player: event.Player && event.Player.User
        ? {
            id: event.Player.User.id,
            name: event.Player.User.name,
            email: event.Player.User.email,
          }
        : null,
      detail: event.detail,
    }));

    ctx.body = plainMatch;
    ctx.status = 200;
  } catch (error) {
    console.error("Error al obtener el partido:", error);
    ctx.throw(400, error.message || "Error al obtener el partido");
  }
});

// Actualizar partido
router.patch("matches.update", "/:id", async (ctx) => {
  try {
    const matchId = ctx.params.id;
    const { date, time, team1, team2, tournamentId, result, status } = ctx.request.body;

    const match = await ctx.orm.Match.findByPk(matchId);
    if (!match) {
      ctx.throw(404, "Match not found");
    }

    // Actualizar solo los campos que están presentes en la solicitud
    const updatedFields = {};
    if (date !== undefined) updatedFields.date = date;
    if (time !== undefined) updatedFields.time = time;
    if (team1 !== undefined) updatedFields.team1 = team1;
    if (team2 !== undefined) updatedFields.team2 = team2;
    if (tournamentId !== undefined) updatedFields.tournamentId = tournamentId;
    if (result !== undefined) updatedFields.result = result;
    if (status !== undefined) updatedFields.status = status;

    await match.update(updatedFields);

    ctx.body = match;
    ctx.status = 200;
  } catch (error) {
    console.log("Error al actualizar el partido:", error);
    ctx.throw(400, error.message || "Error al actualizar el partido");
  }
});

// Agregar evento al partido sin validaciones
router.post("matches.add_event", "/:id/add_event", async (ctx) => {
  try {
    console.log("Evento a enviar:", ctx.request.body);
    const { id: matchId } = ctx.params;
    const { type, minute, player, team, detail } = ctx.request.body;

    // Asumimos que 'player' y 'team' son nombres, necesitamos encontrar sus IDs
    let playerId = null;
    let teamId = null;

    if (player) {
      const playerObj = await ctx.orm.User.findOne({ where: { name: player } });
      if (playerObj) {
        // Encontrar el Player asociado al User
        const playerRecord = await ctx.orm.Player.findOne({ where: { userId: playerObj.id } });
        if (playerRecord) {
          playerId = playerRecord.id;
        }
      }
    }

    if (team) {
      const teamObj = await ctx.orm.Team.findOne({ where: { name: team } });
      if (teamObj) {
        teamId = teamObj.id;
      }
    }

    // Crear el evento directamente con los datos proporcionados
    const event = await ctx.orm.Event.create({
      type,
      minute,
      matchId,
      playerId, // Puede ser null si no se encuentra
      teamId,   // Puede ser null si no se encuentra
      detail,
    });

    // Responder con el evento creado
    ctx.body = {
      message: "Event added successfully",
      event,
    };
    ctx.status = 201;
  } catch (error) {
    console.error("Error al agregar el evento:", error);
    ctx.throw(400, error.message || "Error al agregar el evento");
  }
});

module.exports = router;
