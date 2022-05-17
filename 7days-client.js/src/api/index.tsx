import db, {fetchDataTesting} from "../db"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as cookies from '../app/modules/cookies/index'
import { useEffect, useState } from "react";


//login
//save to localstorage
//save to redux

//redux
//check redux isauth
//unaut -> validasidata local ke firebase -> firebase.auth().onAuthStateChanged((user) => (a.user = user)); (return data autUser)
//        -> authUser not null
//          -> check cookies epired atau tidak - firebase logout ,tidak:return login - ada:return dashboard
//          -> save to redux data user auth
//          -> return isauth
//        -> authUser null
//          -> retun unauth
// auth -> return isauth

//route
// call redux action Auth -> return true false
// true -> dashboard
// false -> login

//set ke cookies untuk api tokennya dan di check expired atau tidaknya 

export const login = async (email:string, password:string, isrememberme:true|false ):Promise<string> => {
  let remember:string = 'session';
  let currentUser = null;
  try {
    if(isrememberme){
      remember = 'none';
    }
    console.log("isremember me : "+isrememberme+" - "+remember)
    //firebase.auth().setPersistence('session')
    
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const a = firebase.auth()
        .signInWithEmailAndPassword(email, password);
        currentUser = (await a).user;
        if(currentUser!=null){
          console.log(`currentUser : `+JSON.stringify(currentUser));
          const user = JSON.stringify(firebase.auth().currentUser)
          window.localStorage.setItem('currentUser', user);
          if(isrememberme){
            cookies.setCookie(cookies.cookiesName.Persistance, JSON.stringify(currentUser), 99);
          }else{
            console.log("save cookies 3 hari");
            cookies.setCookie(cookies.cookiesName.Persistance, JSON.stringify(currentUser), 3);
            console.log("Hasil dari cookies : "+cookies.getCookie(cookies.cookiesName.Persistance));
            
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