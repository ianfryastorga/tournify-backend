const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Router = require('koa-router');
const bcrypt = require('bcryptjs');

dotenv.config();

const router = new Router();

router.post('authentication.signup', '/signup', async (ctx) => {
  const authInfo = ctx.request.body;

  const existingUser = await ctx.orm.User.findOne({ where: { email: authInfo.email } });
  if (existingUser) {
    ctx.body = { error: `Mail '${authInfo.email}' already in use` };
    ctx.status = 400;
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@_.$!%*?&]).{8,}$/;
  if (!passwordRegex.test(authInfo.password)) {
    ctx.body = { 
      error: 'Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character (@_.$!%*?&)'
    };
    ctx.status = 400;
    return;
  }

  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10; // Valor predeterminado de 10 si no se configura
    const hashPassword = await bcrypt.hash(authInfo.password, saltRounds);

    const user = await ctx.orm.User.create({
      email: authInfo.email,
      password: hashPassword,
      name: authInfo.name,
      gender: authInfo.gender,
      role: authInfo.role,
    });

    ctx.body = {
      userId: user.id,
      email: user.email, // Asegúrate de usar "email" y no "mail"
    };
    ctx.status = 201;
  } catch (error) {
    console.error('Error creating user:', error);
    ctx.body = { error: 'Error creating user' };
    ctx.status = 500;
  }
});


router.post('authentication', '/login', async (ctx) => {
  let user;
  const authInfo = ctx.request.body;
  try {
    user = await ctx.orm.User.findOne({ where: { email: authInfo.email } });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  // Validamos que el mail exista
  if (!user) {
    ctx.body = { error: `Mail '${authInfo.email}' not found` };
    ctx.status = 400;
    return;
  }
  const validPassword = await bcrypt.compare(authInfo.password, user.password);
  if (validPassword) {
    ctx.body = {
      email: user.email,
    };
    ctx.status = 200;
  } else {
    ctx.body = { error: 'Wrong password' };
    ctx.status = 400;
    return;
  }
  // Creamos el JWT
  const expirationTime = 1 * 60 * 60 * 24; // 1 dia
  const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
  const token = jwt.sign(
    { scope: ['user'] },
    JWT_PRIVATE_KEY,
    {
      subject: user.id.toString(),
      expiresIn: expirationTime,
    }
  );
  ctx.body = {
    userId: user.id,
    access_token: token,
    token_type: 'Bearer',
    expires_in: expirationTime,
  };
  ctx.status = 200;
});


module.exports = router;
