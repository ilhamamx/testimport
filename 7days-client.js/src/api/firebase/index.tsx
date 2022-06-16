import db from "../../db";
import { createRef } from "../../db/connection";
import { Collaboration, Message } from "../../app/modules/collaboration/model";

export const subsToCollaborations = (
  userId: string,
  onNewData: (data: Collaboration) => void
) => {
  const userRef = createRef("users", userId);
  return db
    .collection("collaborations")
    .where("toUser", "==", userRef)
    .onSnapshot(
      (querySnapshot) => {
        console.log("Masuk observe test ======>");

        querySnapshot.forEach((doc) => {
          console.log(`New ${doc.id}: collab ${doc.data()}`);
          onNewData({
            lastInteractionMessage: doc.data().lastInteractionMessage,
          });
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
    );
};

export const subsToMessages = (
  userId: string,
  onNewData: (data: Message) => void
) => {
  const userRef = createRef("users", userId);
  return db
    .collection("messages")
    .where("user", "==", userRef)
    .where("destination", "==", "inbound")
    .where("notifiedAt", "==", null)
    // .orderBy("isNotified")
    .onSnapshot(
      async(querySnapshot) => {
        console.log("Masuk subsTo Messages ======>");

        await querySnapshot.forEach(async(doc) => {
          console.log(`New ${doc.id}: messages ${doc.data()}`);
          await db.collection("messages")
            .doc(doc.id)
            .update({ notifiedAt: new Date() })
            .catch((err) => {
              console.log("Error setNotified : ", err);
            });
          onNewData({ textContent: doc.data().textContent });
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
    );
};
