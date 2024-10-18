const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("partidos.create", "/", async (ctx) => {
    try {
        const partido = await ctx.orm.Partido.create(ctx.request.body);
        ctx.body = partido;
        ctx.status = 201;
    } catch (error) {
        ctx.throw(400, error);
    }
});

router.get("partidos.list", "/", async (ctx) => {
    try {
        const partidos = await ctx.orm.Partido.findAll();
        ctx.body = partidos;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

router.get("partidos.show", "/:id", async (ctx) => {
    try {
        const partido = await ctx.orm.Partido.findByPk(ctx.params.id);
        if (!partido) {
            ctx.throw(404);
        }
        ctx.body = partido;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

module.exports = router;