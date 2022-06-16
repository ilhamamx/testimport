import db from ".";
import * as conn from "./connection"
import firebase from "firebase/compat/app";
import { converter2 } from "./converter";
import { Account } from "../app/layout/chat/models/ChatItem.model";


export const getAccountByCompanyAndChannel = (company: string, channel: string) =>{
    const companyRef = conn.createRef("company", company);
    console.log("company ref : "+JSON.stringify(companyRef));

    return db
      .collection("account")
      .withConverter(converter2<Account>())
      .where("company", "==", companyRef)
      .where("type", "==", channel)
      .where("isActive", "==", true)
      .get()
      .then((snapshot) => {
        const accounts = snapshot.docs.map(doc => {
          return ({...doc.data(), id: doc.id})   
        });
        return accounts;
      });
  }