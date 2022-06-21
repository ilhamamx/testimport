firebaseDB = require("../../../db/firebase");
const { db, createRef, storage, uploadTaskPromise, firebase } = firebaseDB;
const { getAccountByPhone } = require("../../account");
const { increaseUnreadMessage } = require("../../../db/realtime/collaborations");
const { getMessageByWAMID, updateMessageStatusByID, updateMessageStatusWithErrorByID } = require("../../messages");

const parseJSONWhatsAppDeliveryReport = async (req) => {
  console.log("request DR : " + JSON.stringify(req));

  let wamid = undefined
  let status = undefined;
  let timestamp = undefined;
  let error_code = undefined;
  let error_title = undefined;
  let error_href = undefined;
  let error_detail = undefined;
  let error_data = undefined;
  let recipient_id = undefined;
  let expiration_timestamp = undefined;

  if (req.object) {
    if (
      req.entry &&
      req.entry[0].changes &&
      req.entry[0].changes[0] &&
      req.entry[0].changes[0].value &&
      req.entry[0].changes[0].value.statuses[0]
    ) {
      if (req.entry[0].changes[0].value.statuses[0].id) {
        wamid = req.entry[0].changes[0].value.statuses[0].id;
      }
      if (req.entry[0].changes[0].value.statuses[0].status) {
        status = req.entry[0].changes[0].value.statuses[0].status;
      }
      if (req.entry[0].changes[0].value.statuses[0].timestamp) {
        timestamp = req.entry[0].changes[0].value.statuses[0].timestamp;
      }
      if (req.entry[0].changes[0].value.statuses[0].recipient_id) {
        recipient_id = req.entry[0].changes[0].value.statuses[0].recipient_id;
      }
      if (req.entry[0].changes[0].value.statuses[0].conversation) {
        if (req.entry[0].changes[0].value.statuses[0].conversation.expiration_timestamp) {
          expiration_timestamp = req.entry[0].changes[0].value.statuses[0].conversation.expiration_timestamp;
        }
      }
      if (req.entry[0].changes[0].value.statuses[0].errors) {
        if (req.entry[0].changes[0].value.statuses[0].errors[0]){
            if (req.entry[0].changes[0].value.statuses[0].errors[0].code) {
              error_code =
                req.entry[0].changes[0].value.statuses[0].errors[0].code;
              console.log("error code : " + error_code);
            }
            if (req.entry[0].changes[0].value.statuses[0].errors[0].title) {
              error_title =
                req.entry[0].changes[0].value.statuses[0].errors[0].title;
              console.log("error title : " + error_title);
            }
            if (req.entry[0].changes[0].value.statuses[0].errors[0].href) {
              error_href =
                req.entry[0].changes[0].value.statuses[0].errors[0].href;
              console.log("error href : " + error_href);
            }
        }
      }

      let messageId = undefined;
      messageId = await getMessageByWAMID(wamid);
      if (!messageId[0]) {
        console.log("message not found");
        return;
      }

      console.log("message ID " + messageId[0].id );

      let lastStatus = messageId[0].status;
      console.log("Last status " + lastStatus );

      if(status == lastStatus)return
      else if(lastStatus== 'read' ) return

      // convert unix timestamp to date
      console.log("timestamp : " + timestamp);
      const milliseconds = timestamp * 1000;
      const dateObject = new Date(milliseconds);
      console.log("tanggal : " + dateObject);
      //update without error sent, delivered, read
      if (!error_code && status != 'failed') {
        await updateMessageStatusByID(messageId[0].id, status, dateObject)
            .then(()=>{
                console.log("success update for " + messageId[0].id)
            })
            .catch(error => {
                console.log("error update for message : " + messageId[0].id + ", error :" + error)
            });
      } else {
        await updateMessageStatusWithErrorByID(messageId[0].id, status, dateObject, error_title, error_code, error_href)
            .then(()=>{
                console.log("success update for error message" + messageId[0].id)
            })
            .catch(error => {
                console.log("error update for message : " + messageId[0].id + ", error :" + error)
            });;
      }
      //update if errors (failed)
    }
      return;
  }
}

module.exports = {
  parseJSONWhatsAppDeliveryReport,
};