const Router = require("koa-router");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const router = new Router();

router.post("users.signup", "/signup", async (ctx) => {
  try {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(
      ctx.request.body.password,
      saltRounds
    );
    ctx.request.body.password = hashedPassword;
    const user = await ctx.orm.User.create(ctx.request.body);
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("users.list", "/", async (ctx) => {
  try {
    const users = await ctx.orm.User.findAll();
    ctx.body = users;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

router.get("users.show", "/:id", async (ctx) => {
  try {
    const user = await ctx.orm.User.findByPk(ctx.params.id);
    if (!user) {
      ctx.throw(404);
    }
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error);
  }
});

module.exports = router;
