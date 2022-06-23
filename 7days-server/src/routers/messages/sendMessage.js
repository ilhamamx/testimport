const express = require("express");
var bodyParser = require("body-parser");
const { authSU } = require("../../middleware/auth");
const { sendWhatsappMessage } = require("../../api/whatsapp/messages/sendMessage");
const { resultCode } = require("../../helper/resultCode");

const router = express.Router();
var jsonParser = bodyParser.json();

router.post("/messages/sendMessage", jsonParser, authSU, async (req, res) => {
  try {
    let data = req.body;
    // cek type message
    // if whatsapp, call sendWhatsappMessage
    if (req.body.type) {
      if (req.body.type == "whatsapp") {
        await sendWhatsappMessage(data, function (error, body, responseCode) {
          if (error) {
            res.status(responseCode).send(error);
          } else {
            console.log("body : " + JSON.stringify(body));
            res.status(200).send(body);
          }
        });
      } else {
        res.status(400).send(resultCode("SM", "02", "type"));
      }
    } else {
      res.status(400).send(resultCode("SM", "01", "type"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({"message": "Internal Server Error"});
  }
});

module.exports = router;
