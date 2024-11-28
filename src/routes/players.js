const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.get("players.list", "/", async (ctx) => {
    try {
        const players = await ctx.orm.Player.findAll();
        ctx.body = players;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, `Error fetching players: ${error.message}`);
    }
});

router.get("players.show", "/:id", async (ctx) => {
    try {
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        if (!player) {
            ctx.throw(404);
        }
        ctx.body = player;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

module.exports = router;
