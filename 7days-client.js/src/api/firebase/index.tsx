import db, { getCustomerByID } from "../../db";
import { createRef } from "../../db/connection";
import { Message } from "../../app/layout/chat/models/ChatItem.model";
import { Contact } from "../../app/layout/contact-management/contact-list/core/_models";
import { getItemLC, LCName, setItemLC } from "../../app/modules/localstorage";
import { Notification } from "../../app/modules/notify/Notification/model";

export const subsToMessages = (
  userId: string,
  onNewData: (msg: Message, contact: Contact) => void
) => {
  const userRef = createRef("users", userId);
  return (
    db
      .collection("messages")
      .where("user", "==", userRef)
      .where("destination", "==", "inbound")
      .where("notifiedAt", "==", null)
      // .orderBy("isNotified")
      .onSnapshot(
        async (querySnapshot) => {
          console.log("Masuk subsTo Messages ======>");

          await querySnapshot.forEach(async (doc) => {
            // console.log(`New ${doc.id}: messages ${JSON.stringify(doc.data())}`);
            // let messageReceive : Message
            // messageReceive = doc.data() as Message;
            // let customerRef = doc.data
            await db
              .collection("messages")
              .doc(doc.id)
              .update({ notifiedAt: new Date() })
              .catch((err) => {
                console.log("Error setNotified : ", err);
              });

            let dataContact!: Contact;
            await getCustomerByID(doc.data().customer.id)
              .then(async (doc) => {
                // console.log("get customer by id new message: " + JSON.stringify(doc));
                dataContact =await doc as Contact;
                console.log("Test data : " + JSON.stringify(dataContact));
              })
              .catch((err) => {
                console.log("Error get customer for notif : ", err);
              });

            let notif: Notification = {
              avatar: dataContact.avatar!,
              notifType: "newMessage",
              name: dataContact.lastName
                  ?  dataContact.firstName! + " " + dataContact.lastName!
                  :  dataContact.firstName!,
              phoneNumber: dataContact.phoneNumber!,
              channel: doc.data().channel,
              createdAt: doc.data().createdAt,
              collaborationID: doc.data().collaboration.id,
              state: "primary",
            };
            let arrNotif: Array<Notification> = [];
            if (getItemLC(LCName.Notification)) {
              arrNotif = getItemLC(LCName.Notification);
            }
            arrNotif.push(notif);
            arrNotif = arrNotif.sort((a, b) =>
              new Date(a.createdAt.seconds * 1000) >
              new Date(b.createdAt.seconds * 1000)
                ? -1
                : 1
            ); 
            setItemLC(LCName.isHaveNotif, true);
            setItemLC(LCName.Notification, arrNotif);
            
            onNewData(
              doc.data() as Message,
              dataContact
            );
          });

          // querySnapshot.docChanges().forEach(change => {

          //   if (change.type === 'added') {
          //     console.log(`New ${change.doc.id}: collaborations `, change.doc.data());
          //     onNewData({lastInteractionMessage: change.doc.data().lastInteractionMessage});
          //   }
          //   if (change.type === 'modified') {
          //     console.log('Modified collaborations: ', change.doc.data());
          //   }
          //   if (change.type === 'removed') {
          //     console.log('Removed collaborations: ', change.doc.data());
          //   }
          // });
        },
        (error) => {
          console.log("Error observe test ======> " + error);
        }
      )
  );
};
