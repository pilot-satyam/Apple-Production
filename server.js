const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = new Koa();
const router = new Router();

const privateKey = fs.readFileSync('privateKey.pem');

router.get('/generate-token', (ctx) => {
  const header = {
    typ: 'JWT',
    alg: 'ES256',
    kid: 'SC2W85W7RY'
  };

  const payload = {
    iss: '69a6de7e-1195-47e3-e053-5b8c7c11a4d1',
    aud: 'appstoreconnect-v1',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (20 * 60),
    bid: 'com.chopraglobal.chopra'
  };

  const token = jwt.sign(payload, privateKey, { header });

  ctx.body = { token }; // Send the token as the API response
});

app.use(router.routes()).use(router.allowedMethods());

// Start the server
app.listen(3000, () => {
  console.log('API server started on port 3000');
});
