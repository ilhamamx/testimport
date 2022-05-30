import db from "../db";
import firebase from "firebase/compat/app";

let lastVisible: firebase.firestore.QueryDocumentSnapshot;
let firstVisible: firebase.firestore.QueryDocumentSnapshot;

export const fetchCustomers = (search: string, limit: number) =>
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
    .limit(limit)
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
      return customers;
    });

export const deleteCustomer = (id: string) =>
  db.collection("customers").doc(id).update({ isActive: false });
// .get()
// .then((snapshot) => {
//   const customers = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     data: doc.data(),
//   }));

//   return customers;
// });

export const fetchCustomersNext = (search: string, limit: number) =>
  db
    .collection("customers")
    .where("companyID", "==", "cWt6gXnRGTFqL5TbYn6r")
    .where("isActive", "==", true)
    .orderBy("firstName")
    .startAt(search)
    .endAt(search + "\uf8ff")
    .startAfter(lastVisible)
    .limit(limit)
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
      firstVisible = snapshot.docs[snapshot.docs.length - 1];
      return customers;
    });

export const fetchCustomersPrev = (search: string, limit: number) =>
  db
    .collection("customers")
    .where("companyID", "==", "cWt6gXnRGTFqL5TbYn6r")
    .where("isActive", "==", true)
    .orderBy("firstName")
    .startAt(search)
    .endAt(search + "\uf8ff")
    .endBefore(firstVisible)
    .limit(limit)
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return customers;
    });
