import {DocumentReference} from "@firebase/firestore-types";
import firebase from 'firebase/compat/app';

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

// export interface MessageModel {
//   user: number
//   type: 'in' | 'out'
//   text: string
//   time: string
//   // messagetype: string 
//   channel?: string
//   mediaUrl?: string 
//   template?: boolean
// }

export interface Message {
  channel: string,
  createdAt: firebase.firestore.Timestamp;
  customer?: DocumentReference,
  user?: DocumentReference,
  customerModel?: Customer,
  userModel?: User,
  mediaUrl?: string,
  messageType: string,
  textContent: string,
  updatedAt: firebase.firestore.Timestamp;
  id?: string
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
}
