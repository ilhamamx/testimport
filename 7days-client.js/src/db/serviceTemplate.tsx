import db from ".";
import { createRef } from "./connection";
import { converter2 } from "./converter";
import { Templates, Language } from "../app/layout/chat/models/ChatItem.model";

export const getListTemplateByCompany = async(companyID: string) =>
  await db
    .collection("templates")
    .where("company", "==", createRef("company", companyID))
    .where("isActive", "==", true)
    .withConverter(converter2<Templates>())
    .get()
    .then((snapshot) => {
      const templates = snapshot.docs.map(doc => {
        return ({...doc.data(), id: doc.id})      
      })
      return templates;
    });

export const getTemplateById = async(templateID: string) =>
  await db
    .collection("templates")
    .doc(templateID)
    .withConverter(converter2<Templates>())
    .get()
    .then((doc) => {
      return doc.data();
    }
    );

export const getLanguageListByTemplateId = async(templateID: string) =>
  await db
    .collection("templates")
    .doc(templateID)
    .collection("languages")
    .withConverter(converter2<Language>())
    .get()
    .then((snapshot) => {
      const languages = snapshot.docs.map(doc => {
        return ({...doc.data(), id: doc.id})      
      })
      return languages;
    }
    );