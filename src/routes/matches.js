const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("matches.create", "/", async (ctx) => {
    try {
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

module.exports = router;
