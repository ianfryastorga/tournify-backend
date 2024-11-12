const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("matches.create", "/", async (ctx) => {
  try {
    const { date, time, team1, team2, tournamentId } = ctx.request.body;

    if (!date || !time || !team1 || !team2 || !tournamentId) {
      ctx.throw(
        400,
        "All fields (date, time, team1, team2, tournamentId) are required"
      );
    }

    if (team1 === team2) {
      ctx.throw(400, "Teams must be different for a match");
    }

    const teamOne = await ctx.orm.Team.findByPk(team1);
    if (!teamOne) {
      ctx.throw(404, "Team 1 not found");
    }

    const teamTwo = await ctx.orm.Team.findByPk(team2);
    if (!teamTwo) {
      ctx.throw(404, "Team 2 not found");
    }

    const tournament = await ctx.orm.Tournament.findByPk(tournamentId);
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }

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

router.get("matches.byTournamentSlug", "/tournamentSlug/:slug", async (ctx) => {
  try {
    const { slug } = ctx.params;

    const tournament = await ctx.orm.Tournament.findOne({ where: { slug } });
    if (!tournament) {
      ctx.throw(404, "Tournament not found");
    }

    const matches = await ctx.orm.Match.findAll({ where: { tournamentId: tournament.id } });
    ctx.body = matches;
    ctx.status = 200;
  } catch (error) {
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

router.post("matches.add_event", "/:match_id/add_event", async (ctx) => {
  try {
    const { match_id } = ctx.params;
    const { minute, type, player, team } = ctx.request.body;

    const match = await ctx.orm.Match.findByPk(match_id);
    if (!match) {
      ctx.throw(404, "Match not found");
    }

    if (minute === undefined || !type || !player || !team) {
      ctx.throw(
        400,
        "Fields 'minute', 'type', 'player', and 'team' are required"
      );
    }

    const newEvent = {
      minute,
      type,
      player,
      team,
    };

    const events = match.events || [];
    events.push(newEvent);

    match.events = events;
    await match.save();

    ctx.body = { message: "Event added to match", match };
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});


router.put("matches.update", "/:id", async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(ctx.params.id);
    if (!match) {
      ctx.throw(404, "Match not found");
    }
    const updatedMatch = await match.update(ctx.request.body);
    ctx.body = updatedMatch;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});


module.exports = router;
