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

export interface Message {
  channel: string,
  createdAt:Date,
  customer?: DocumentReference,
  mediaUrl?: string,
  messageType: string,
  textContent: string,
  updatedAt:Date
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
    // lastInteractionAt: typeof firebase.firestore.Timestamp;
    lastInteractionChannel: string,
    lastInteractionType: string,
    lastInteractionMessage: string,
    customer?: DocumentReference,
    customerModel?: Customer,
    LastMessageModel?: Message,
}