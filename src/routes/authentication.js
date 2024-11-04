const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Router = require('koa-router');
const bcrypt = require('bcrypt');

dotenv.config();

const router = new Router();

router.post('authentication.singup', '/singup', async (ctx) => {
  const authInfo = ctx.request.body;

  let user = await ctx.orm.User.findOne({ where: { mail: authInfo.mail } });
  const rut = await ctx.orm.User.findOne({ where: { rut: authInfo.rut } });

  if (user) {
    ctx.body = { error: `Mail '${authInfo.mail}' already in use` };
    ctx.status = 400;
    return;
  }
  if (rut) {
    ctx.body = { error: `rut '${authInfo.rut}' already in use` };
    ctx.status = 400;
    return;
  }
  // Validamos que el password cumpla con los requisitos
  if (!authInfo.password.match(/[a-z]/) || !authInfo.password.match(/[A-Z]/) || !authInfo.password.match(/[0-9]/) || !authInfo.password.match(/[@_.$!%*?&]/)) {
    ctx.body = { error: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character (@_.$!%*?&)' };
    ctx.status = 400;
    return;
  }
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashPassword = await bcrypt.hash(authInfo.password, saltRounds);

    user = await ctx.orm.User.create({
      rut: authInfo.rut,
      mail: authInfo.mail,
      password: hashPassword,
    });
  } catch (validationError) {
    ctx.body = validationError;
    ctx.status = 400;
    return;
  }
  ctx.body = {
    userId: user.id,
    rut: user.rut,
    mail: user.mail,
  };
  ctx.status = 201;
});

router.post('authentication', '/login', async (ctx) => {
  let user;
  const authInfo = ctx.request.body;
  try {
    user = await ctx.orm.User.findOne({ where: { mail: authInfo.mail } });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  // Validamos que el mail exista
  if (!user) {
    ctx.body = { error: `Mail '${authInfo.mail}' not found` };
    ctx.status = 400;
    return;
  }
  const validPassword = await bcrypt.compare(authInfo.password, user.password);
  if (validPassword) {
    ctx.body = {
      rut: user.rut,
      mail: user.mail,
    };
    ctx.status = 200;
  } else {
    ctx.body = { error: 'Wrong password' };
    ctx.status = 400;
    return;
  }
  // Creamos el JWT
  const expirationTime = 1 * 60 * 60 * 24; // 1 dia
  const JTW_PRIVATE_KEY = process.env.JWT_SECRET;
  const token = jwt.sign(
    { scope: ['user'] },
    JTW_PRIVATE_KEY,
    { subject: user.id.toString() },
    { expiresIn: expirationTime },
  );
  ctx.body = {
    userId: user.id,
    rut: user.rut,
    access_token: token,
    token_type: 'Bearer',
    expires_in: expirationTime,
  };
  ctx.status = 200;
});

module.exports = router;
