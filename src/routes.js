const Router = require("koa-router");
const authentication = require("./routes/authentication");

const router = new Router();

router.use("/auth", authentication.routes());

module.exports = router;
