const express = require('express');
var bodyParser = require('body-parser')
const { parseJSONWhatsAppMessage } = require('../../../api/whatsapp/messages/receive')

const router = express.Router();
var jsonParser = bodyParser.json()

// create method POST, receive cloud API whatsapp message
// parsing data from whatsapp
// save to firebase (butuh struktur data)
// return data to client

router.post('/whatsapp/receive', jsonParser, async(req, res) => {
  try {
    let data = req.body;
    console.log(JSON.stringify(req.body, null, 2));
    await parseJSONWhatsAppMessage(data);
    res.status(200).send({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//test


module.exports = router;