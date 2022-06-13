import {DocumentReference} from "@firebase/firestore-types";
import { Timestamp } from "../../../../db";
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
  id: string
}

export interface Users {
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
  createdAt:{
    seconds: number,
    nanoseconds: number
  },
  customer?: DocumentReference,
  user?: DocumentReference,
  customerModel?: Customer,
  userModel?: Users,
  mediaUrl?: string,
  messageType: string,
  textContent: string,
  updatedAt:{
    seconds: number,
    nanoseconds: number
  }
  id: string
}

export interface HandledMessageListItem {
    id: string,
    fullName: string,
    image: string,
    lastMessages: string,
    unreadMessages: BadgeItem[],
    lastInteractionAt: {
      seconds: number,
      nanoseconds: number
    }
    lastInteractionChannel: string,
    lastInteractionType: string,
    lastInteractionMessage: string,
    customer?: DocumentReference,
    customerModel?: Customer,
    LastMessageModel?: Message,
}