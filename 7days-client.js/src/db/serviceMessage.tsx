import db from "../db";
import { converter2 } from "./converter";
import { Message,BadgeItem } from "../app/layout/chat/models/ChatItem.model";
import firebase from 'firebase/compat/app'

export const fetchMessage = async (collaboration: string) => {
  return await db
    .collection("collaborations")
    .doc(collaboration)
    .collection("messages")
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

export const unreadMessage = (collaborationId: string) => { 
  return firebase.database()
  .ref("/collaborations/"+collaborationId+"/")
  .once('value').then((snapshot) => {
    let bi:BadgeItem[] = [];
    console.log(`snapshot val ${JSON.stringify(snapshot.val())}`)
    snapshot.forEach(node => {
      if(node.exists()){
        bi.push({
          unreadCount:node.val().unreadMessage,
          className: "",
          channel: node.key!
        });
      }
    })
    
    // console.log("Hasil Function : "+JSON.stringify(bi));
    return bi;
  });
} 


