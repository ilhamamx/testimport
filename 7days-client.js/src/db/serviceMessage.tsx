import db from "../db";
import * as conn from "./connection"
import { converter2 } from "./converter";
import { Message,BadgeItem } from "../app/layout/chat/models/ChatItem.model";
import firebase from 'firebase/compat/app'

export const fetchMessage = async (collaboration: string) => {
  const collabRef = conn.createRef("collaborations", collaboration);

  return await db
    .collection("messages")
    .where("collaboration","==",collabRef)
    .where("isActive","==",true)
    .withConverter(converter2<Message>())
    .orderBy("createdAt")
    .get()
    .then(snapshot => {
      const message = snapshot.docs.map(doc => {
        return ({...doc.data(), id: doc.id})      
      })
      return message;
    });
}

export const unreadMessages = (collaborationId: string) => { 
  return firebase.database()
  .ref("/collaborations/"+collaborationId+"/")
  .once('value').then((snapshot) => {
    let bi:BadgeItem[] = [];
    snapshot.forEach(node => {
      if(node.exists()){
        bi.push({
          unreadCount:node.val().unreadMessages,
          className: "",
          channel: node.key!
        });
      }
    })
    return bi;
  });
} 

export const createMessage = (Message: any) => {
  return db
    .collection("messages")
    .add(Message)
    .then((docRef) => {
    })
    .catch((err) => {
      console.error("Error create customer : ", err);
    });
};

export const clearUnreadMessages = async(collaborationId: string, channel:string ) => {
  // const collabRef = firebase.database().ref(`/collaborations/${collaborationId}/${channel}`);
  const collabRef = firebase.database().ref(`/collaborations/${collaborationId}`);
  collabRef.set({
    unreadMessages: 0
  });
}

export const updateUnreadMessages = async(collaborationId: string ) => {
  const collabRef = firebase.database().ref(`/collaborations/${collaborationId}`);
  await collabRef.once("value", async(snapshot) => {
    snapshot.forEach((questionSnapshot) => {
      const collabChildRef = firebase.database().ref(`/collaborations/${collaborationId}/${questionSnapshot.key}`);
      collabChildRef.update({
        unreadMessages: 0
      });
    })
  })
}

// export const updateUnreadMessages2 = async(collaborationId: string, channel:string ) => {
//   // const collabRef = firebase.database().ref(`/collaborations/${collaborationId}/${channel}`);
//   const collabRef = firebase.database().ref(`/collaborations/${collaborationId}`);
//   await collabRef.once("value", async(snapshot) => {
//     if(!snapshot.val()){
//       await clearUnreadMessages(collaborationId, channel);
//     }else{
//       const unreadMessages = snapshot.val().unreadMessages;
//       await collabRef.update({
//         unreadMessages: 0
//       });
//     }
//   })
// }


