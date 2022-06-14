import db from "../db";
import firebase from "firebase/compat/app";
// import { useState } from "react";
// import { Contact } from "../app/layout/contact-management/contact-list/core/_models";

//let lastVisible: firebase.firestore.QueryDocumentSnapshot;
let firstVisible: firebase.firestore.QueryDocumentSnapshot;
let lastVisible: firebase.firestore.QueryDocumentSnapshot;
// let field = "firstName";
export const fetchCustomers = (search: string, limit: number, company: firebase.firestore.DocumentReference ) =>
  db
    .collection("customers")
    .where("company", "==", company)
    .where("isActive", "==", true)
    .orderBy("firstNameInsensitive")
    .startAt(search.toLowerCase())
    .endAt(search.toLowerCase() + "\uf8ff")
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
      const checkVisible = snapshot.docs[snapshot.docs.length - 1];
      if (checkVisible !== undefined) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
      }
      return customers;
    });

export const deleteCustomer = (id: string) =>
  db.collection("customers").doc(id).update({ isActive: false, updatedAt: new Date() });

export const fetchCustomersNext = (search: string, limit: number, company: firebase.firestore.DocumentReference) =>
  db
    .collection("customers")
    .where("company", "==", company)
    .where("isActive", "==", true)
    .orderBy("firstNameInsensitive")
    .startAt(search.toLowerCase())
    .endAt(search.toLowerCase() + "\uf8ff")
    .startAfter(lastVisible)
    .limit(limit)
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const checkVisible = snapshot.docs[snapshot.docs.length - 1];
      if (checkVisible !== undefined) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
        firstVisible = snapshot.docs[0];
      }
      return customers;
    });

export const fetchCustomersPrev = (search: string, limit: number, company: firebase.firestore.DocumentReference) =>
  db
    .collection("customers")
    .where("company", "==", company)
    .where("isActive", "==", true)
    .orderBy("firstNameInsensitive")
    .startAt(search.toLowerCase())
    .endAt(search.toLowerCase() + "\uf8ff")
    .endBefore(firstVisible)
    .limitToLast(limit)
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const checkVisible = snapshot.docs[snapshot.docs.length - 1];
      if (checkVisible !== undefined) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
        firstVisible = snapshot.docs[0];
      }
      return customers;
    });

export const getCustomerByID = async (id: string) =>
  await db
    .collection("customers")
    .doc(id)
    .get()
    .then((snapshot) => ({ id: snapshot.id, ...snapshot.data() }))
    .catch((err) => {
      console.log("Error getting documents (getCustomerByID)", err);
    });

export const createCustomer = (contact: any) => {
  return db
    .collection("customers")
    .add(contact)
    .then((docRef) => {
      console.log("New customer : " + docRef.id);
    })
    .catch((err) => {
      console.log("Error create customer : ", err);
    });
};

export const updateCustomer = (contact: any) => {
  return db
    .collection("customers")
    .doc(contact.id)
    .update(contact)
    .then((doc) => {
      console.log("Updated: " + doc);
    })
    .catch((err) => {
      console.log("Error create customer : ", err);
    });
};
