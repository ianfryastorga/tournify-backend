const Koa = require("koa");
const { koaBody } = require("koa-body");
const koaLogger = require("koa-logger");
const router = require("./routes");
const orm = require("./models");
const cors = require('@koa/cors');

const app = new Koa();

app.context.orm = orm;
app.use(cors({
  origin: '*', // Cambia esto al origen específico si necesitas restringirlo
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));
app.use(koaLogger());
app.use(koaBody());
app.use(router.routes());

app.use((ctx) => {
  ctx.body = "Hello World";
});

module.exports = app;
