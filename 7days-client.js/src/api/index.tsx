
import db, {fetchDataTesting} from "../db"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const login = async (email:string, password:string):Promise<string> => {
  
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    console.log(`firebase login success`)
    return Promise.resolve("success")
  } catch (error) {
    console.log(`firebase login error ${error}`)
    return Promise.reject(error)
  }
  
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