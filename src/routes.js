const Router = require("koa-router");
const usuarios = require("./routes/usuarios");
const torneos = require("./routes/torneos");

const router = new Router();

router.use("/usuarios", usuarios.routes());
router.use("/torneos", torneos.routes());   

module.exports = router;
