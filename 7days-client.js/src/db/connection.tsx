import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import db from './index'
import * as lc from '../app/modules/localstorage/index';
import { updateSession } from "../db/session";

export const status =(uid: string) =>{
  let status = "offline";
  firebase.database().ref("/status/"+uid+"/state")
  .on('value', snapshot => {
    status =  snapshot.val();
  });
  return status;
} 

export const createFirebaseRef = (collection: any, id: any) => firebase.database().ref(`/${collection}/${id}`)

export const createRef = (collection: any, docId: string) => db.doc(`${collection}/` + docId)

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
}

export const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
}

export const isOnlineForFirestore = {
  state: 'online',
  last_changed: firebase.firestore.FieldValue.serverTimestamp()
}

export const onConnectionChanged = (callback: (arg0: any) => void) => {
  // connection changed di update ketika ada action, dan memiliki session id 
  // ketika logout di hapus session id di local strorage dan di buatkan baru ketika login

  /***
   * Multiple login prevention
   * 
   */

  const currentUser = lc.getItemLC(lc.LCName.User);
  const sessionID = lc.getItemLC(lc.LCName.SessionID);
  const createdSession = lc.getItemLC(lc.LCName.SessionCreated);
  firebase
    .database()
    .ref('.info/connected')
    .on('value', snapshot => {
      console.log(" --------- >>  Session ID : "+sessionID);
      // if(!snapshot.val() && sessionID!=null){
      //   updateSession(currentUser.uid,sessionID,createdSession)
      // }
      callback(snapshot.val())
    })
  }