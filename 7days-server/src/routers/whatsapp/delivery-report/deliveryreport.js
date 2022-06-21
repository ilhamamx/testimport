const express = require('express');
var bodyParser = require('body-parser');
const { parseJSONWhatsAppDeliveryReport } = require('../../../api/whatsapp/delivery-report/deliveryreport');

const router = express.Router();
var jsonParser = bodyParser.json()

// create method POST, receive cloud API whatsapp delivery report
// parsing data from whatsapp
// save to firebase (butuh struktur data)
// return data to client

router.post('/whatsapp/dr', jsonParser, async(req, res) => {
  try {
    let data = req.body;
    console.log(JSON.stringify(req.body, null, 2));
    await parseJSONWhatsAppDeliveryReport(data);
    res.status(200).send({ message: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;