import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import db from './index'

export const status =(uid: string) =>{
  let status = "offline";
  firebase.database().ref("/status/"+uid+"/state")
  .on('value', snapshot => {
    console.log("---->>> state on status function : "+snapshot.val());
    status =  snapshot.val();
  });
  return status;
} 

export const createFirebaseRef = (collection: any, id: any) => firebase.database().ref(`/${collection}/${id}`)

export const createRef = (collection: any, docId: string) => db.doc(`${collection}/` + docId)

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP
}

export const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP
}

export const isOnlineForFirestore = {
  state: 'online',
  last_changed: firebase.firestore.FieldValue.serverTimestamp()
}

export const onConnectionChanged = (callback: (arg0: any) => void) => 
  firebase
    .database()
    .ref('.info/connected')
    .on('value', snapshot => {
      callback(snapshot.val())
    })
