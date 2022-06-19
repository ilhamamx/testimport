import {DocumentReference} from "@firebase/firestore-types";
import firebase from 'firebase/compat/app';
import { boolean, string } from "yup";

export interface BadgeItem {
  unreadCount: number,
  className: string,
  channel: string
}

export interface Customer {
  firstName: string,
  lastName: string,
  lastInteractionAt: string,
  avatar: ImageBitmap
  id: string,
  gender: string,
  phoneNumber: string
}

export interface User {
  id?: string,
  uid?: string,
  address: string,
  email: string,
  companyID: string,
  last_changed: Date
  name: string
  phoneNumber: string
  session_id: string
  sessiontoken: string
  state: string
}

export type DestinationStatus = {
  inbound: "inbound",
  outbound : "outbound",
  blast : "blast"
};

export interface Message {
  channel: string,
  destination: DestinationStatus["inbound"]|DestinationStatus["outbound"]|DestinationStatus["blast"],
  createdAt: firebase.firestore.Timestamp,
  customer?: DocumentReference,
  user?: DocumentReference,
  customerModel?: Customer,
  userModel?: User,
  mediaUrl?: string,
  messageType: string|undefined,
  textContent: string,
  updatedAt: firebase.firestore.Timestamp,
  id?: string,
  messageStatus?: string
  resultCode?: string,
  resultMessage?: string,
  errorCode?: string,
  resultMessageId?: string,
  responseJson?: string,
  responseCode?: string,
  previewurl?:boolean,
  collaboration: DocumentReference,
  isActive: boolean,
  filename?: string,
  filesize?: string,
  voice: boolean
}

export interface HandledMessageListItem {
    id: string,
    fullName: string,
    image: string,
    lastMessages: string,
    unreadMessages: BadgeItem[],
    lastInteractionAt: firebase.firestore.Timestamp;
    lastInteractionChannel: string,
    lastInteractionType: string,
    lastInteractionMessage: string,
    customer?: DocumentReference,
    customerModel?: Customer,
    toUser?: DocumentReference,
    userModel?: User,
    LastMessageModel?: Message,
    company?: DocumentReference,
    companyModel?: Company
}

export const MessageStatus = {
  sent: "sent",
  submitted : "submitted",
  delivered : "delivered",
  failed : "failed",
  read: "read"
};

export interface Account {
  id: string,
  type:	string,
  isActive:	boolean,
  whatsappNumber:	string,
  company: DocumentReference,
  companyModel?: Company
  access_token:	string,
  whatsappNumber_ID:	string
};

export interface Company {
  id: string,
  uid: string,
  companyName:	string,
  address:	string,
  currency:	string,
  isActive:	boolean
  quotaBalance?:	number,
  paymentTerm?:	string,
  creditLimit?:	number
};