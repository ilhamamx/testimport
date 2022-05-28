import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as lc from '../app/modules/localstorage';
import { createSession } from '../db/session';

export const login = async (email:string, password:string, isrememberme:true|false ):Promise<string> => {
  let remember:string = 'session';
  let currentUser = null;
  try {
    if(isrememberme){
      remember = 'none';
    }
    console.log("isremember me : "+isrememberme+" - "+remember)
    
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const a = firebase.auth()
        .signInWithEmailAndPassword(email, password);
        currentUser = (await a).user;
        if(currentUser!=null){
          createSession(currentUser.uid);
          if(isrememberme){
            lc.setItemLC(lc.LCName.User,currentUser);
          }else{
            lc.setItemLCWithExpiry(lc.LCName.User,currentUser,3);
          }
        }
      })
    
    return Promise.resolve("success")
  } catch (error) {
    console.log(`firebase login error ${error}`)
    return Promise.reject(error)
  }
}

export const onAuthStateChanged = (onAuthCallback: firebase.Observer<any, Error> | ((a: firebase.User | null) => any)) => 
  firebase.auth().onAuthStateChanged(onAuthCallback);

export const AuthUser = async (currentUser:any):Promise<boolean>=>{
  let isAuthored = false;
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            if(currentUser != null){
              if(currentUser.uid === user.uid ){
                isAuthored = true;
              }
            }
            resolve(isAuthored);
          }
        });
      } catch(error){
        console.log(`firebase login error ${error}`)
        reject(error)
      }
    })
}

export const logout = async () => {
  return firebase.auth().signOut()
}
