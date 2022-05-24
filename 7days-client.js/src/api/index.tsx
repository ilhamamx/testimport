import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as lc from '../app/modules/localstorage';
import * as Log from "../util/SDayslogger";
import { useNavigate } from "react-router-dom";
import { checkUserConnection } from './server/connection';

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
          checkUserConnection(currentUser.uid);
          const user = JSON.stringify(firebase.auth().currentUser)
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
        firebase.auth().onAuthStateChanged(function (currentUser) {
          if (currentUser) {
            isAuthored = true;
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
//export default prin;