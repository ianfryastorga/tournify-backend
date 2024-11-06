const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("tournaments.create", "/", async (ctx) => {
  try {
    const tournament = await ctx.orm.Tournament.create(ctx.request.body);
    ctx.body = tournament;
    ctx.status = 201;
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
          as: "Matches", // Esto debería funcionar ahora con `tournamentId`
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
