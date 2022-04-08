import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const db = firebase
  .initializeApp(
    {
      apiKey: "AIzaSyAtC1n4HgA_FUWoEB7klx5z7EKy0debqzg",
      authDomain: "days-stagging-5b2b7.firebaseapp.com",
      databaseURL: "https://days-stagging-5b2b7-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "days-stagging-5b2b7",
      storageBucket: "days-stagging-5b2b7.appspot.com",
      messagingSenderId: "779001893238",
      appId: "1:779001893238:web:da7dd3a0f4599bb479aa57",
      measurementId: "G-JVW406GY3C"
    }
  )
  .firestore()

export default db
const { Timestamp } = firebase.firestore
export { Timestamp } 

// export const fetchDataTesting = async () => {
//   const db = firebase.firestore();
//   await db.collection('testing')
//   .get()
//   .then(snapshot => {
//     snapshot.docs.forEach((doc) => {
//       return doc.data()
//     })
//   })
// }


