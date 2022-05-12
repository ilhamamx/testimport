const express = require('express');
const router = require('./routers/auth/user');
const { loginSuperUser } = require('./api/auth');


const app = express();
const email = process.env.SuperUserEmail;
const password = process.env.SuperUserPassword;

// // configure express custom middleware
// app.use(express.json());
app.use(router);
loginSuperUser(email, password);



module.exports = app;