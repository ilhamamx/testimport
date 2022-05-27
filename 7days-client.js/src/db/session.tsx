import { checkUserConnection } from '../api/server/connection';
import { LCName, setItemLC } from '../app/modules/localstorage';
import db from './index'

export const createSession = async (uid: string):Promise<string>=>{
  const createdAt: number = Date.now();
  let sessionid = "";
    return new Promise((resolve, reject) => {
      try {
         db.collection(`/users/${uid}/session`).add({
          "created": createdAt,
          "screentime":0,
          "ended":0
        }).then(function(docRef) {
          if(docRef){
            sessionid = docRef.id;
            setItemLC(LCName.SessionID,docRef.id);
            setItemLC(LCName.SessionCreated,createdAt);
            checkUserConnection(uid, sessionid);
          }
        })
        resolve(sessionid)
      } catch(error){
        console.log(`firebase login error ${error}`)
        reject(error)
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


export const saveUserSessionToken = async (uid: string, token: string):Promise<string>=>{
    return new Promise((resolve, reject) => {
      try {
         db.doc(`/users/${uid}`).update({
          "sessiontoken": token})
          setItemLC(LCName.SessionToken,token);
          resolve("success")
      } catch(error){
        console.log(`firebase save user token error ${error}`)
        reject(error)
      }
    })
}

export async function getUserSessionToken(uid: string){
  await db
    .collection(`/users/${uid}/`)
    .get()
    .then((snapshot) => {
      // snapshot.docs.forEach((doc) => {
      //   return doc.data();
      // });
      return snapshot.docs.map((snap) => ({ ...snap.data(), id: snap.id }));
    });
}