const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("authentication.signup", "/signup", async (ctx) => {
  ctx.body = "Sign up route";
});

module.exports = router;
