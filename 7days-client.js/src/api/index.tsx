import db, {fetchDataTesting} from "../db"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useEffect, useState } from "react";
import * as lc from '../app/modules/localstorage';

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
          console.log(`=====>>>>    currentUser : `+JSON.stringify(currentUser));
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

export function AuthTest(){
  console.log(` ------>> authTest : `)
  const [isAuthored, setIsAuthored] = useState(false);
   useEffect(() => { firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const user = JSON.stringify(firebase.auth().currentUser)
      setIsAuthored(true);
      console.log(user); 
    } else {
      setIsAuthored(false); 
    }
  });
}, [setIsAuthored]);
  return isAuthored;
}

export function AuthUser(currentUser:any){
  console.log(` ------>> authTest : `)
  let isAuthored = false;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const user = JSON.stringify(firebase.auth().currentUser)
      console.log("firebase check onAuthStateChanged"+user);
      isAuthored = true;
    } 
  });
  return isAuthored;
}

export const AuthUser2 = async (currentUser:any):Promise<boolean>=>{
  console.log(` ------>> authTest : `)
  let isAuthored = false;
  try{
    await firebase.auth().onAuthStateChanged(function (currentUser) {
        if (currentUser) {
          const user = JSON.stringify(firebase.auth().currentUser);
          console.log("firebase check onAuthStateChanged" + user);
          isAuthored = true;
          console.log("------------------>> user auth by firebase");
        }
      });
  }catch(error){
    console.log(`firebase login error ${error}`)
    return Promise.reject(error)
  }
  return Promise.resolve(isAuthored)
}

export const logout = async () => {
  try {
    const res = firebase.auth().signOut()
    return res
  } catch (errorMessage) {
    return Promise.reject(errorMessage)
  }
}

//export default prin;