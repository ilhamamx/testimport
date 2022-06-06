import db from ".";
import firebase from "firebase/compat/app";

export const getUserByID = async (id: string) =>
  await db
    .collection("users")
    .doc(id)
    .get()
    .then((snapshot) => ({ id: snapshot.id, ...snapshot.data() }))
    .catch((err) => {
      console.log("Error getting user (getUserByID)", err);
    });

    export const getCompanyRefByUserID = (id: string) =>
    db
      .collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        let companyRef: any;
        if (!doc.exists) {
          // doc.data() will be undefined in this case
          console.log("No such document users with id : "+ id + " !");
        } else {
          const user = doc.data();
          if (user) {
            //console.log("Document data:", company.customerCount);
            companyRef = user.companyID;
            console.log("getCompanyRefByUserID =>>> " + companyRef);     
          }
        }
        return companyRef;
      });