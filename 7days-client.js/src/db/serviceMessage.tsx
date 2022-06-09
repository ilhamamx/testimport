import db from "../db";
import { converter2 } from "./converter";
import { Message } from "../app/layout/chat/models/ChatItem.model";


export const fetchLastMessage = async (collaboration: string) => {
  return await db
    .collection("collaborations")
    .doc(collaboration)
    .collection("messages")
    .withConverter(converter2<Message>())
    .orderBy("createdAt")
    .limitToLast(1)
    .get()
    .then(snapshot => {
      const message = snapshot.docs.map(doc => {
        return ({...doc.data(), id: doc.id})      
      })
      return message;
    });
}
