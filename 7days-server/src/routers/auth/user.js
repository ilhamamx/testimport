const express = require('express');
const {authSU} = require('../../middleware/auth');
const { getUserEMailByPhone, fetchUsers } = require('../../api/user');
var bodyParser = require('body-parser')
require('../../db/firebase')
const firebase = require('firebase/compat/app')

const router = express.Router();
var jsonParser = bodyParser.json()

// auth user (super user) auto run on server start
// get user by phone number, return email

// client side (react) need to login with email and password and store the token (uid) in remember me
// client side if email and password, directly request login to firebase
// client side if phone number and password, request to nodeJs to get email from phone number

// retry login superuser if token is expired

// middleware to check if user is logged in

// router.post('/auth/login', jsonParser, authSU, async(req, res) => {
//   try {
//     console.log(req.body);
//     // const uid = await loginEmailPass(req.body.email, req.body.password)
//     // console.log(`ini data uid ${uid}` );
//     const data = getUserProfileData(uid);
//     console.log(data);
//     res.status(201).send({ user: "ini data" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

router.post('/user/findByPhoneNumber', jsonParser, authSU, async(req, res) => {
  try {
    console.log(req.body);
    // const uid = await loginEmailPass(req.body.email, req.body.password)
    // console.log(`ini data uid ${uid}` );
    const data = await getUserEMailByPhone(req.body.phoneNumber);
    
    if (!data || data.length<=0)
      return res.status(400).send({error: 'invalid user'})
    
    res.status(201).send({ email: data[0].email });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get('/user/list', jsonParser, authSU, async(req, res) => {
  try {
    console.log(req.body);
    // const uid = await loginEmailPass(req.body.email, req.body.password)
    // console.log(`ini data uid ${uid}` );
    const data = await fetchUsers(req.body.phoneNumber);
    console.log(data);
    res.status(201).send({ user: "ini data" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;