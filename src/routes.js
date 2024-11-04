const Router = require("koa-router");
const users = require("./routes/users");
const tournaments = require("./routes/tournaments");
const matches = require("./routes/matches");

const router = new Router();

router.use("/users", users.routes());
router.use("/tournaments", tournaments.routes());
router.use("/matches", matches.routes());

module.exports = router;
