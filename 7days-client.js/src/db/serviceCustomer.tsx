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
    .orderBy("firstName")
    .startAt(search)
    .endAt(search + "\uf8ff")
    // .orderBy("firstName", 'asc')
    // .startAt("firstName", ">=", search)
    // .endAt("firstName", "<", search + "\uf8ff")
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      return customers;
    });

export const deleteCustomer = (
  id: string
) =>
  db
    .collection("customers")
    .doc(id)
    .update({isActive: false})
    // .get()
    // .then((snapshot) => {
    //   const customers = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     data: doc.data(),
    //   }));

    //   return customers;
    // });
