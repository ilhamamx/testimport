firebaseDB = require("../../../db/firebase");
const { db, createRef } = firebaseDB;
const { getAccountByPhoneNumberTypeCompany } = require("../../account");
const { resultCode } = require("../../../helper/resultCode");
const axios = require("axios");
const { formFreeMessageFormatFromClient, formTemplateMessageFormatFromClient } = require("./helper/formMessage")

const sendWhatsappMessage = async (req, callback) => {
  //parse JSON
  let companyID = undefined;
  let from = undefined;
  let to = undefined;
  let message_type = "text";
  let jsonWhatsapp
  if (req.whatsapp) {
    if (req.whatsapp.company) {
      companyID = req.whatsapp.company;
    } else {
      return callback(resultCode("SM", "01", "company"), null, 400);
    }
    if (req.whatsapp.from) {
      from = req.whatsapp.from;
    } else {
      return callback(resultCode("SM", "01", "from"), null, 400);
    }
    if (req.whatsapp.to) {
      to = req.whatsapp.to;
    } else {
      return callback(resultCode("SM", "01", "to"), null, 400);
    }
    if (req.whatsapp.type) {
      message_type = req.whatsapp.type;
    }
    if (message_type == "text" || message_type == "image" || message_type == "document" || message_type == "audio" || message_type == "video") {
      let contextJSON;
      if (message_type == "text") {
        if(!req.whatsapp.text) 
          return callback(resultCode("SM", "01", message_type), null, 400);
        contextJSON = req.whatsapp.text;
      } else if (message_type == "image") {
        if(!req.whatsapp.image) 
          return callback(resultCode("SM", "01", message_type), null, 400);
        contextJSON = req.whatsapp.image;
      }else if(message_type == "document") {
        if(!req.whatsapp.document) 
          return callback(resultCode("SM", "01", message_type), null, 400);
        contextJSON = req.whatsapp.document;
      }else if(message_type == "audio") {
        if(!req.whatsapp.audio) 
          return callback(resultCode("SM", "01", message_type), null, 400);
        contextJSON = req.whatsapp.audio;
      }else if(message_type == "video") {
        if(!req.whatsapp.video) 
          return callback(resultCode("SM", "01", message_type), null, 400);
        contextJSON = req.whatsapp.video;
      }
      await formFreeMessageFormatFromClient(message_type, to, contextJSON, (resultJSON, error) => {
        if (error) {
          return callback(error, null, 400);
        } else {
          jsonWhatsapp = resultJSON;
        }
      })
    } else if(message_type == "template"){
      let contextJSON;
      if(!req.whatsapp.template)
        return callback(resultCode("SM", "01", message_type), null, 400);
      contextJSON = req.whatsapp.template;
      await formTemplateMessageFormatFromClient(message_type, to, contextJSON, (resultJSON, error) => {
        if (error) {
          return callback(error, null, 400);
        } else {
          jsonWhatsapp = resultJSON;
        }
      })
    }else {
      return callback(resultCode("SM", "02", "type"), null, 400);
    }
  } else {
    return callback(resultCode("SM", "01", "whatsapp"), null, 400);
  }
  //get data account from and company id
  const type = "whatsapp";
  const companyRef = createRef("company", companyID);
  let dataAccount = await getAccountByPhoneNumberTypeCompany(
    from,
    type,
    companyRef
  );
  if(!dataAccount[0]){
    return callback(resultCode("SM", "02", "company/from"), null, 400);
  }
  console.log("data account : " + dataAccount);
  console.log("json : " + JSON.stringify(jsonWhatsapp, null, 2));
  console.log("access_token : " + dataAccount[0].access_token);
  const header = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${dataAccount[0].access_token}`
  };

  const facebookEndpoint =
    `https://graph.facebook.com/v13.0/${dataAccount[0].whatsappNumber_ID}/messages`;

  await sendRequest(header, facebookEndpoint, jsonWhatsapp, function (error, response, responseCode) {
    if (error) {
      console.log("error : " + JSON.stringify(error, null, responseCode));
      return callback(error, null, responseCode);
    } else {
      console.log("response : " + JSON.stringify(response));
      return callback(null, response, responseCode);
    }
  });
};

async function sendRequest(header, url, json, callback) {
  console.log("masuk send request");
  await axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url: "https://coordinated-honey-taste.glitch.me/test", //for testing purpose using sandbox
    // url: url,
    data: json,
    headers: header,
  })
    .then((response) => {
      let respJSON = response.data;
      console.log("response : " + JSON.stringify(respJSON, null, 2));
      let jsonResponse = resultCode("SM", "00");
      jsonResponse = { ...jsonResponse, "messageID" : respJSON.messages[0].id, "whatsapp" : {...respJSON} };
      return callback(null, jsonResponse, 200);
    })
    .catch((error) => {
      let errorJSON = error.response.data;
      console.log("errorJSON : " + JSON.stringify(errorJSON, null, 2));
      let jsonResponse;
      jsonResponse = resultCode("SM", "03");
      jsonResponse = { ...jsonResponse, "errorCode" : errorJSON.error.code, "whatsapp" : {...errorJSON} };
      return callback(jsonResponse, null, error.response.status);
    });
}

module.exports = {
  sendWhatsappMessage,
};

