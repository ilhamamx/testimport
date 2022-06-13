import db from "../../db"
import { createRef } from "../../db/connection";
import {Collaboration} from "../../app/modules/collaboration/model"

  const observerTest = db.collection('customers')
  .where("uid" ,"==", 'E5rBXFOn0cAn4wQzBsP1')
  .onSnapshot(querySnapshot => {
    console.log("Masuk observe test ======>")
    
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        console.log('New : customer ', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('Modified customer: ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed customer: ', change.doc.data());
      }
    });
  },(error) => {
    console.log("Error observe test ======> " + error)
  });



export const subsToCollaborations = (userId:string, onNewData: (data:Collaboration) => void) => {
  const userRef = createRef("users", userId)
  return db.collection('collaborations')
    .where("toUser" ,"==", userRef)
    .onSnapshot(querySnapshot => {
      console.log("Masuk observe test ======>")

      querySnapshot.forEach(doc => {
      
        console.log(`New ${doc.id}: collab ${doc.data()}`);
        onNewData({lastInteractionMessage: doc.data().lastInteractionMessage});
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
      
    },(error) => {
      console.log("Error observe test ======> " + error)
    });
}
  

  