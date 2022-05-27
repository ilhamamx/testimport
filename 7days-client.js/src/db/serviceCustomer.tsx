import db from "../db";
import firebase from "firebase/compat/app";

export const fetchCustomers = (
  sort: string,
  order: firebase.firestore.OrderByDirection,
  search: string
) =>
  db
    .collection("customers")
    .where("companyID", "==", "cWt6gXnRGTFqL5TbYn6r")
    .where("isActive", "==", true)
    .orderBy(sort, order)
    .startAt("firstName", ">=", search)
    .endAt("firstName", "<=", search + "\uf8ff")                                    
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      //console.log(doc);
      return customers;
    });
