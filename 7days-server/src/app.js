const express = require('express');
const router = require('./routers/auth/user');
const wa_router = require('./routers/whatsapp/messages/receive')
const { loginSuperUser } = require('./api/auth');
const cors = require('cors')

const app = express();
const email = process.env.SuperUserEmail;
const password = process.env.SuperUserPassword;

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use(cors())
app.use(router);
app.use(wa_router);
loginSuperUser(email, password);


module.exports = app;