import db from "../db";
import firebase from "firebase/compat/app";
import { useState } from "react";
//let lastVisible: firebase.firestore.QueryDocumentSnapshot;
let firstVisible: firebase.firestore.QueryDocumentSnapshot;
let lastVisible: firebase.firestore.QueryDocumentSnapshot;
let field = "firstName";
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
      const checkVisible = snapshot.docs[snapshot.docs.length - 1];
      if (checkVisible != undefined) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
      }
      return customers;
    });

export const deleteCustomer = (id: string) =>
  db.collection("customers").doc(id).update({ isActive: false });

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
      const checkVisible = snapshot.docs[snapshot.docs.length - 1];
      if (checkVisible != undefined) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
        firstVisible = snapshot.docs[0];
      }
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
    .limitToLast(limit)
    .get()
    .then((snapshot) => {
      const customers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const checkVisible = snapshot.docs[snapshot.docs.length - 1];
      if (checkVisible != undefined) {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
        firstVisible = snapshot.docs[0];
      }
      return customers;
    });

export const getCustomerByID = (id: string) =>
  db
    .collection("customers")
    .doc(id)
    .get()
    .then( (snapshot) => ({ id: snapshot.id, ...snapshot.data() }))
    .catch(err => {
      console.log('Error getting documents (getCustomerByID)', err);
    });
  
