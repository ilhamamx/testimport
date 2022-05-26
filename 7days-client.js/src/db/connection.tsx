import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import db from './index'
import * as lc from '../app/modules/localstorage/index';

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

export const isOfflineForDatabase  = (sessionid:string) => {
  return ({state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
  session_id: lc.getItemLC(lc.LCName.SessionID)
  })
}

export const isOnlineForDatabase = (sessionid:string) => {
  return ({
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
  session_id: lc.getItemLC(lc.LCName.SessionID)})
}

export const isOnlineForFirestore = (sessionid:string) => {
  return ({
  state: 'online',
  last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  session_id: lc.getItemLC(lc.LCName.SessionID)})
}

export const onConnectionChanged = (callback: (arg0: any) => void) => {
  // connection changed di update ketika ada action, dan memiliki session id 
  // ketika logout di hapus session id di local strorage dan di buatkan baru ketika login

  /***
   * Multiple login prevention
   * 
   */
  firebase
    .database()
    .ref('.info/connected')
    .on('value', snapshot => {
      callback(snapshot.val())
    })
  }