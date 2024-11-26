// matches.js

const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

// Create a new match
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

// List all matches
router.get("matches.list", "/", async (ctx) => {
  try {
    const matches = await ctx.orm.Match.findAll();
    ctx.body = matches;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

// Get match by ID
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
          as: "Team1", // Alias for team1
          attributes: ["id", "name"],
        },
        {
          model: ctx.orm.Team,
          as: "Team2", // Alias for team2
          attributes: ["id", "name"],
        },
      ],
    });

    if (!match) {
      ctx.throw(404, "Match not found");
    }

    const plainMatch = match.toJSON();

    // Transform events to include only relevant details
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
    console.error(error);
    ctx.throw(400, error);
  }
});

// Update match
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
    console.log("Error in match update:", error);
    ctx.throw(400, error);
  }
});

// Add event to match without verifications
router.post("matches.add_event", "/:id/add_event", async (ctx) => {
  try {
    console.log("Request body:", ctx.request.body);
    const { id: matchId } = ctx.params;
    const { type, minute, player, team, detail } = ctx.request.body;

    // Verify that the match exists
    const match = await ctx.orm.Match.findByPk(matchId);
    if (!match) {
      ctx.throw(404, "Match not found");
    }

    // Attempt to find the team by name
    let teamId = null;
    const teamObj = await ctx.orm.Team.findOne({ where: { name: team } });
    if (teamObj) {
      teamId = teamObj.id;
    }

    // Attempt to find the player by name
    let playerId = null;
    const playerObj = await ctx.orm.User.findOne({ where: { name: player } });
    if (playerObj) {
      playerId = playerObj.id;
    }

    // Create the event without additional verifications
    const event = await ctx.orm.Event.create({
      type,
      minute,
      matchId,
      playerId: playerId, // May be null
      teamId: teamId,     // May be null
      detail,
    });

    // Omit any additional logic like incrementing goals

    // Respond with the created event
    ctx.body = {
      message: "Event added successfully",
      event,
    };
    ctx.status = 201;
  } catch (error) {
    console.error("Error in add_event:", error);
    ctx.throw(400, error.message || "An error occurred");
  }
});

module.exports = router;
