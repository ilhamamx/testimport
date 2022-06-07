import db from ".";
import firebase from "firebase/compat/app";

/***
 * 1. 
 * Noted : tambahkan function untuk get data collaboration by uid where handleAt not null ???? dan expired > now,
 */

export const fetchCollaborationsByUser = (uid: string, company: string) =>
  db
    .collection("collaborations")
    .where("toUser", "==", uid)   // to user
    .where("company", "==", company)   // to company
    .where("handleAt", "!=", false)// handleAt is not null
    // .where("expiredAt",">",new Date())  // not expired
    .get()
    .then((snapshot) => {
      const collaboration = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      return collaboration;
    });