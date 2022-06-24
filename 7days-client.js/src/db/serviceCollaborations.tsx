import db from ".";
import * as conn from "./connection"
import { converter2 } from "./converter";
import { HandledMessageListItem } from "../app/layout/chat/models/ChatItem.model";
import { Message } from "../app/layout/chat/models/ChatItem.model";

export const fetchCollaborationsByUser = (uid: string, company: string ) => {
  
  const companyRef = conn.createRef("company", company);
  const userRef = conn.createRef("users", uid);

  return db
    .collection("collaborations")
    .withConverter(converter2<HandledMessageListItem>())
    .where("company", "==", companyRef)
    .where("toUser", "==", userRef) 
    .orderBy("lastInteractionAt","desc")
    .get()
    .then(snapshot => {
      const collaborations = snapshot.docs.map(doc => {
        return ({...doc.data(), id: doc.id})      
      })
      return collaborations;
    });
}

/* without converter */
export const fetchCollaborationsByUser_2 = (uid: string, company: string ) => {
  
  const companyRef = conn.createRef("company", company);
  const userRef = conn.createRef("users", uid);

  return db
    .collection("collaborations")
    .where("company", "==", companyRef)
    .where("toUser", "==", userRef)   
    .where("handleAt", "!=", false) 
    .get()
    .then(snapshot => {
      const collaborations = snapshot.docs.map(doc => {
        return ({...doc.data(), id: doc.id})      
      })
      return collaborations;
    });
}

export const getActiveCollaborationByCustomerIdAndCompanyId = (customerId: string, companyId: string) => {
  const customerRef = conn.createRef("customers", customerId);
  const companyRef = conn.createRef("company", companyId);

  return db
    .collection("collaborations")
    .where("customer", "==", customerRef)
    .where("company", "==", companyRef)
    .where("isActive", "==", true)
    .withConverter(converter2<HandledMessageListItem>())
    .get()
    .then(snapshot => {
      const collaborations = snapshot.docs.map(doc => {
        return ({...doc.data(), id: doc.id})      
      })
      return collaborations;
    }
    );
}

export const updateLastInteraction = (
  collaborationid: string,
  newMessage: Message
) => {
  let lastMessage = newMessage.textContent;
  if (
    (newMessage.textContent === "" || newMessage.textContent === undefined) &&
    newMessage.filename !== undefined
  ) {
    lastMessage = newMessage.filename;
  }
  db.collection("collaborations").doc(collaborationid).update({
    lastInteractionChannel: newMessage.channel,
    lastInteractionAt: newMessage.createdAt,
    lastInteractionType: newMessage.messageType,
    lastInteractionMessage: lastMessage,
  });
};