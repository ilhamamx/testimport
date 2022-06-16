import {DocumentReference} from "@firebase/firestore-types";
import firebase from 'firebase/compat/app';
  
export interface Collaboration {
  lastInteractionMessage:string
}

export type Message = {
  channel: string,
  createdAt: firebase.firestore.Timestamp,
  customer?: DocumentReference,
  user?: DocumentReference,
  // customerModel?: Customer,
  // userModel?: User,
  mediaUrl?: string,
  messageType: string,
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
}