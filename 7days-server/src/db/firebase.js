const firebase = require('firebase/compat/app')
const firestore = require('firebase/compat/firestore')
require('firebase/compat/auth')

const firebaseConfig = {
  apiKey: "AIzaSyAtC1n4HgA_FUWoEB7klx5z7EKy0debqzg",
  authDomain: "days-stagging-5b2b7.firebaseapp.com",
  databaseURL: "https://days-stagging-5b2b7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "days-stagging-5b2b7",
  storageBucket: "days-stagging-5b2b7.appspot.com",
  messagingSenderId: "779001893238",
  appId: "1:779001893238:web:da7dd3a0f4599bb479aa57",
  measurementId: "G-JVW406GY3C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore() // getFirestore()

const { Timestamp } = firebase.firestore
// export { Timestamp }

const vari = "string vari"
//export {vari}
//


module.exports = {
  db,
  vari,
  Timestamp
}