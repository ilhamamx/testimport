
import db, {fetchDataTesting} from "../db"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
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
      remember = 'local';
    }
    console.log("isremember me : "+isrememberme+" - "+remember)
    await firebase.auth()
      .setPersistence(remember)
      .then(async () => {
        const a = firebase.auth()
        .signInWithEmailAndPassword(email, password);
        currentUser = (await a).user;
      })
    
    if(currentUser!=null){
      console.log(`currentUser : `+JSON.stringify(currentUser));
    }
    currentUser = firebase.auth().onAuthStateChanged((user) => (currentUser = user));
    console.log(`currentUser2 : `+JSON.stringify(firebase.auth().currentUser))
    console.log(`firebase login success`)
    return Promise.resolve("success")
  } catch (error) {
    console.log(`firebase login error ${error}`)
    return Promise.reject(error)
  }
  
}

export function authTest(){
  console.log(` ------>> authTest : `)
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(`currentUser authTest : `+JSON.stringify(firebase.auth().currentUser))
    }
  });
}

export const logout = async () => {
  try {
    const res = firebase.auth().signOut()
    return res
  } catch (errorMessage) {
    return Promise.reject(errorMessage)
  }
}

//export default print;