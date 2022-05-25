import { LCName, setItemLC } from '../app/modules/localstorage';
import db from './index'

export function createSession(uid: string) {
  const createdAt: number = Date.now();
  //start and id save to local storage
  console.log("createdAt : "+createdAt);
  db.collection(`/users/${uid}/session`).add({
    "created": createdAt,
    "screentime":0,
    "ended":0
  }).then(function(docRef) {
    if(docRef){
      setItemLC(LCName.SessionID,docRef.id);
      setItemLC(LCName.SessionCreated,createdAt);
    }
  })
}

export async function updateSession(uid: string,sessionId : string, created: number) {
  const endedAt: number = Date.now();
  console.log("createdAt : "+endedAt);
  const screentime: number = endedAt - created;
  await db.collection(`/users/${uid}/session`).doc(sessionId).update({
    "screentime":screentime,
    "ended":endedAt
  })
}