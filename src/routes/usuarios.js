const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("usuarios.signup", "/signup", async (ctx) => {
    try {
        const usuario = await ctx.orm.Usuario.create(ctx.request.body);
        ctx.body = usuario;
        ctx.status = 201;
    } catch (error) {
        ctx.throw(400, error);
    }   
}); 

router.get("usuarios.list", "/", async (ctx) => {
    try {
        const usuarios = await ctx.orm.Usuario.findAll();
        ctx.body = usuarios;
        ctx.status = 200;
    }
    catch (error) {
        ctx.throw(400, error);
    }
});

router.get("usuarios.show", "/:id", async (ctx) => {
    try {
        const usuario = await ctx.orm.Usuario.findByPk(ctx.params.id);
        if (!usuario) {
            ctx.throw(404);
        }
        ctx.body = usuario;
        ctx.status = 200;
    }
    catch (error) {
        ctx.throw(400, error);
    }
});


module.exports = router;
