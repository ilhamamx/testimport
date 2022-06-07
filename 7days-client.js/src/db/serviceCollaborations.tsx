import db from ".";
import * as conn from "./connection"
import { converter2 } from "./converter";
import { HandledMessageListItem } from "../app/layout/chat/models/ChatItem.model";
/***
 * 1. 
 * Noted : tambahkan function untuk get data collaboration by uid where handleAt not null ???? dan expired > now,
 */

export const fetchCollaborationsByUser = (uid: string, company: string ) => {
  
  const companyRef = conn.createRef("company", company);
  const userRef = conn.createRef("users", uid);

  return db
    .collection("collaborations")
    .withConverter(converter2<HandledMessageListItem>())
    .where("company", "==", companyRef)   // to company
    .where("toUser", "==", userRef)   // to user
    .where("handleAt", "!=", false)// handleAt is not null
    .get()
    .then(snapshot => {
      const collaborations = snapshot.docs.map(doc => {

        return ({...doc.data(), id: doc.id})
      })
      // console.log("collaborations :", JSON.stringify(collaborations))
      
      return collaborations;
    });
}
  

/* */
// export const fetchCollaborationsByUser_ = (uid: string, company: string ) => {
  
//   const companyRef = conn.createRef("company", company);
//   const userRef = conn.createRef("users", uid);

//   return db
//     .collection("collaborations")
//     .where("company", "==", companyRef)   // to company
//     .where("toUser", "==", userRef)   // to user
//     .where("handleAt", "!=", false)// handleAt is not null
//     .get()
//     .then(snapshot => {
//       const collaborations = snapshot.docs.map(doc => {

//         return (
//           {id: doc.id,
            
//           }
//         )
//       })
//       console.log("collaborations :", JSON.stringify(collaborations))
      
//       return collaborations;
//     });
// } 