
import db, {fetchDataTesting} from "../db"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useEffect, useState } from "react";
// import {IUser} from '../app/modules/auth/model/User';


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
      })
    
    if(currentUser!=null){
      console.log(`currentUser : `+JSON.stringify(currentUser));
    }
    // currentUser = firebase.auth().onAuthStateChanged((user) => (currentUser = user));
    // console.log(`currentUser2 : `+JSON.stringify(firebase.auth().currentUser))
    // console.log(`firebase login success`)
    // console.log("promise : "+JSON.stringify(Promise.resolve("success")))
    return Promise.resolve("success")
  } catch (error) {
    console.log(`firebase login error ${error}`)
    return Promise.reject(error)
  }
  
}

//create cookies
function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/dashboard";
}

//get cookies
function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//delete cookies
function deleteCookie(cname:string, route: string) {
  document.cookie = cname +'=; Path=/'+ route + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
};

export const autth = async ():Promise<boolean> => {
  let auth = false;
  await firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      auth = true;
    } 
  });
  return Promise.resolve(auth)
}


export function AuthTest(){
  console.log(` ------>> authTest : `)
  const [isAuthored, setIsAuthored] = useState(false);
   useEffect(() => { firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const user = JSON.stringify(firebase.auth().currentUser)
      setIsAuthored(true);
      setCookie('user', user, 3);
      console.log(user);
      
    } else {
      setIsAuthored(false);
      deleteCookie('user', 'dashboard');      
    }

  });
}, [setIsAuthored]);
  return isAuthored;
}

export function CompareKeys() {

};

export const logout = async () => {
  try {
    const res = firebase.auth().signOut()
    return res
  } catch (errorMessage) {
    return Promise.reject(errorMessage)
  }
}

//export default prin;