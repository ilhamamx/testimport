firebaseDB = require('../db/firebase')
const { db } = firebaseDB

const getMessageByWAMID = async wamid => {
    if(!wamid){
        return null
    }
    return await db
      .collection("messages")
      .where("resultMessageId", "==", wamid)
      .get()
      .then((snaps) => {
        return snaps.docs.map((snap) => ({ ...snap.data(), id: snap.id }));
      })
      .catch((error) => {
        //TODO
        console.log("Error getMessageByWAMID : " + error);
      });
}

const updateMessageStatusByID = async (message_id, status, timestamp ) => {
    if(!message_id || !status || !timestamp){
        return
    }
    if(status === "sent"){
        return await db.collection("messages")
            .doc(message_id).update({
                status: status,
                sentAt: timestamp,
                updatedAt: new Date()
        });
    } else if(status === "delivered"){
        return await db.collection("messages").doc(message_id).update({
          status: status,
          deliveredAt: timestamp,
          updatedAt: new Date(),
        });
    } else if(status === "read"){
        return await db.collection("messages").doc(message_id).update({
          status: status,
          readAt: timestamp,
          updatedAt: new Date(),
        });
    }
}

const updateMessageStatusWithErrorByID = async (message_id, status, timestamp, errorTitle, errorCode, errorUrl ) => {
  if(!message_id || !status || !timestamp ){
      return
  }
  
  return await db.collection("messages")
      .doc(message_id)
      .update({
          status: status,
          failedAt: timestamp,
          updatedAt: new Date(),
          errorCode: errorCode? errorCode : "",
          errorTitle: errorTitle? errorTitle : "",
          errorHref: errorUrl? errorUrl : ""
        })
        .catch((error) => {
          console.log("Error updateMessageStatusWithErrorByID : " + error);
        });
}


module.exports = {
  getMessageByWAMID,
  updateMessageStatusByID,
  updateMessageStatusWithErrorByID
};