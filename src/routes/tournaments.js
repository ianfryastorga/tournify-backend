const Router = require("koa-router");
const dotenv = require("dotenv");
const Sequelize = require("sequelize");

dotenv.config();

const router = new Router();

router.post("tournaments.create", "/", async (ctx) => {
  try {
    const { name, date, location, organizer } = ctx.request.body;

    if (!name || !date || !location || !organizer) {
      ctx.throw(
        400,
        "Fields 'name', 'date', 'location', and 'organizer' are required"
      );
    }

    const organizerUser = await ctx.orm.User.findByPk(organizer);
    if (!organizerUser) {
      ctx.throw(404, "Organizer not found");
    }

    const tournament = await ctx.orm.Tournament.create(ctx.request.body);
    ctx.body = tournament;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.post("tournaments.add_team", "/:tournament_id/add_team", async (ctx) => {
  try {
    const { team_id } = ctx.request.body;
    const { tournament_id } = ctx.params;

    const tournament = await ctx.orm.Tournament.findByPk(tournament_id);
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }

    const team = await ctx.orm.Team.findByPk(team_id);
    if (!team) {
      ctx.throw(404, "Team not found");
    }

    if (team.tournamentId === tournament.id) {
      ctx.throw(400, "Team is already part of this tournament");
    }

    team.tournamentId = tournament.id;
    await team.save();

    ctx.body = { message: "Team added to tournament", team };
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("tournaments.list", "/", async (ctx) => {
  try {
    const tournaments = await ctx.orm.Tournament.findAll({
      include: [
        {
          model: ctx.orm.User,
          as: "Organizer",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    // Transformar los datos para excluir el organizer ID
    const plainTournaments = tournaments.map((tournament) => {
      const plainTournament = tournament.toJSON();
      delete plainTournament.organizer; // Excluir el campo "organizer" si es redundante
      return plainTournament;
    });

    ctx.body = plainTournaments;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.throw(400, error);
  }
});


router.get("tournaments.show", "/:id", async (ctx) => {
  try {
    const tournamentExist = await ctx.orm.Tournament.findByPk(ctx.params.id);
    if (!tournamentExist) {
      ctx.status = 201;
      ctx.message = "Tournament not found";
      return;
    }
    const tournament = await ctx.orm.Tournament.findByPk(ctx.params.id, {
      attributes: {
        exclude: ["organizer"],
      },
      include: [
        {
          model: ctx.orm.Team,
          as: "Teams",
          include: [
            {
              model: ctx.orm.Player,
              as: "Players",
              include: [
                {
                  model: ctx.orm.User,
                  attributes: ["id", "name", "email", "role"],
                },
              ],
            },
          ],
        },
        {
          model: ctx.orm.Match,
          as: "Matches",
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
                      attributes: ["id", "name", "email", "role"],
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
          ],
        },
        {
          model: ctx.orm.User,
          as: "Organizer",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    const plainTournament = tournament.toJSON();

    // Si faltan equipos, jugadores o partidos, se asignan arrays vacíos
    plainTournament.Teams = plainTournament.Teams || [];
    plainTournament.Matches = plainTournament.Matches || [];

    plainTournament.Teams = plainTournament.Teams.map((team) => ({
      ...team,
      Players: team.Players || [], // Si no tiene jugadores, asignamos un array vacío
    }));

    plainTournament.Matches = plainTournament.Matches.map((match) => ({
      ...match,
      Events: match.Events || [], // Si no tiene eventos, asignamos un array vacío
    }));

    // Mapear los jugadores y eventos como se hacía antes
    plainTournament.Teams = plainTournament.Teams.map((team) => ({
      ...team,
      Players: team.Players.map((player) => ({
        id: player.User.id,
        name: player.User.name,
        email: player.User.email,
        role: player.User.role,
        goals: player.goals || 0,
      })),
    }));

    plainTournament.Matches = plainTournament.Matches.map((match) => ({
      ...match,
      Events: match.Events.map((event) => ({
        id: event.id,
        type: event.type,
        minute: event.minute,
        team: event.Team ? { id: event.Team.id, name: event.Team.name } : null,
        player: event.Player
          ? {
            id: event.Player.User.id,
            name: event.Player.User.name,
            email: event.Player.User.email,
            role: event.Player.User.role,
          }
          : null,
      })),
    }));

    ctx.body = plainTournament;
    ctx.status = 200;

  } catch (error) {
    console.log(error);
    ctx.throw(400, "An error occurred while processing the request");
  }
});


router.patch("tournaments.update", "/:id", async (ctx) => {
  try {
    const tournament = await ctx.orm.Tournament.findByPk(ctx.params.id);
    if (!tournament) {
      ctx.throw(404);
    }
    await tournament.update(ctx.request.body);
    ctx.body = tournament;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("tournaments.top_scorers", "/:id/top-scorers", async (ctx) => {
  try {
    const { id } = ctx.params;

    // Verificar que el torneo exista
    const tournament = await ctx.orm.Tournament.findByPk(id);
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }

    // Obtener los máximos goleadores del torneo
    const topScorers = await ctx.orm.Player.findAll({
      attributes: [
        "id", // ID del jugador
        "goals", // Número de goles
      ],
      include: [
        {
          model: ctx.orm.Team,
          as: "Team",
          attributes: ["id", "name"], // Información del equipo
          where: { tournamentId: id }, // Equipos asociados al torneo
        },
        {
          model: ctx.orm.User,
          as: "User",
          attributes: ["id", "name", "email", "role"], // Información del usuario
        },
      ],
      order: [["goals", "DESC"]], // Ordenar por goles de mayor a menor
      limit: 5, // Limitar a los 5 máximos goleadores
    });

    ctx.body = topScorers.map((player) => ({
      id: player.id,
      goals: player.goals,
      team: {
        id: player.Team.id,
        name: player.Team.name,
      },
      user: {
        id: player.User.id,
        name: player.User.name,
        email: player.User.email,
        role: player.User.role,
      },
    }));
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.throw(400, error);
  }
});
module.exports = router;
