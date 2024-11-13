const Router = require("koa-router");
const dotenv = require("dotenv");

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
    const tournaments = await ctx.orm.Tournament.findAll();
    ctx.body = tournaments;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("tournaments.show", "/:id", async (ctx) => {
  try {
    const tournament = await ctx.orm.Tournament.findByPk(ctx.params.id, {
      include: [
        {
          model: ctx.orm.Team,
          as: "Teams",
          include: [
            {
              model: ctx.orm.Player,
              as: "Players",
            },
          ],
        },
        {
          model: ctx.orm.Match,
          as: "Matches", 
        },
        {
          model: ctx.orm.User,
          as: "Organizer",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!tournament) {
      ctx.throw(404);
    }
    ctx.body = tournament;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
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

module.exports = router;
