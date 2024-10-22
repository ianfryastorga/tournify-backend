const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("torneos.create", "/", async (ctx) => {
    try {
        const torneo = await ctx.orm.Torneo.create(ctx.request.body);
        ctx.body = torneo;
        ctx.status = 201;
    } catch (error) {
        ctx.throw(400, error);
    }
});

router.get("torneos.list", "/", async (ctx) => {
    try {
        const torneos = await ctx.orm.Torneo.findAll();
        ctx.body = torneos;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

router.get("torneos.show", "/:id", async (ctx) => {
    try {
        const torneo = await ctx.orm.Torneo.findByPk(ctx.params.id);
        if (!torneo) {
            ctx.throw(404);
        }
        ctx.body = torneo;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

router.patch("torneos.update", "/:id", async (ctx) => {
    try {
        const torneo = await ctx.orm.Torneo.findByPk(ctx.params.id);
        if (!torneo) {
            ctx.throw(404);
        }
        await torneo.update(ctx.request.body);
        ctx.body = torneo;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

module.exports = router;
