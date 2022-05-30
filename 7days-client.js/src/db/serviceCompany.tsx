import db from ".";
import firebase from "firebase/compat/app";

export const getCustomerCountByCompanyID = (id: string) =>
  db
    .collection("company")
    .doc(id)
    .get()
    .then((snapshot) => {
      const counter = snapshot.get("customerCount");
      return counter;
    });
// return company;
