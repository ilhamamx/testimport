import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Firestore.
admin.initializeApp();
const firestore = admin.firestore();

import {User} from "./types";

const converter = <T>() => {
  return {
    toFirestore: (data: Partial<T>) => data,
    fromFirestore:
      (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
        return snap.data() as T;
      },
  };
};

exports.onUserStatusChanged = functions.database.ref('/status/{uid}').onUpdate(
  async (change, context) => {
    const eventStatus = change.after.val()

    const userFirestoreRef = firestore.doc(`/users/${context.params.uid}`)

    const statusSnapshot = await change.after.ref.once('value')
    const status = statusSnapshot.val()

    if (status.last_changed > eventStatus.last_changed) {
      return null
    }

    eventStatus.last_changed = new Date(eventStatus.last_changed)
    return userFirestoreRef.update(eventStatus)
  }
)


exports.updateSession = functions.database.ref('/status/{uid}').onUpdate(
  async (change, context) => {
    const eventStatus = change.after.val()
    const statusSnapshot = await change.after.ref.once('value')
    const status = statusSnapshot.val()

    if (status.last_changed > eventStatus.last_changed) {
      return;
    }

    const userFirestoreRef = firestore.doc(`/users/${context.params.uid}/session/${eventStatus.session_id}`)
    userFirestoreRef.get().then((doc) => {
      if (doc.exists) {
        if(eventStatus.state==="offline"){
          const startedAt = doc.get("started");
          const oldSceenTime = doc.get("screentime");
          const endAt = new Date().getTime();
          const sceenTime = (oldSceenTime+(endAt-startedAt));
          return userFirestoreRef.update({
            screentime: sceenTime,
            ended : endAt
          })
        }else{
          const startedAt = new Date().getTime();
          return userFirestoreRef.update({
            started : startedAt
          })
        }
      }else{
        return;
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
      return;
    });
  }
)



exports.findEmailByPhone = functions.https
  .onRequest((request, response): void | Promise<void> => {
    const phoneNumber = request.body.phoneNumber;

    // const auth = context.auth;

    // console.log("run message, %s", auth)
    // the ID of the admin who added the user
    // const addedByUid = context.auth.uid

    // console.log("auth uid, %s", addedByUid)

    if (!phoneNumber) {
      response.status(400).json({error: "invalid user"});
      return;
    }

    firestore.collection("users")
      .where("phoneNumber", "==", phoneNumber)
      .withConverter(converter<User>())
      .get()
      .then(snaps => {
        const data:User[] = snaps.docs.map(snap => ({...snap.data(), id: snap.id}));

        if (!data || data.length<=0) {
          return response.status(400).send({error: "invalid user"});
        }

        return response.status(200).send({ email: data[0].email});
      })
      .catch(error => {
        // TODO
        console.log(error);
        return response.status(400).send({error: "invalid user"});
      });
  });

  exports.onCreateCustomer = functions.firestore.document('/customers/{uid}')
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();
    console.log("New Customer created, data : " + JSON.stringify(newValue));

    // perform desired operations ...
    if(newValue.company !== null ){
      console.log("New Customer created, update customer count . . .");
      firestore.collection("company").doc(newValue.companyID.id).update({customerCount: admin.firestore.FieldValue.increment(1)})
    }
    return;
  });

  exports.onDeleteCustomer = functions.firestore.document('/customers/{uid}')
  .onDelete((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const deletedValue = snap.data();
    console.log("Deleted data : " + JSON.stringify(deletedValue));

    // perform desired operations ...
    if(deletedValue.company !== null ){
      console.log("Delete Customer, update customer count . . .");
      firestore.collection("company").doc(deletedValue.companyID.id).update({customerCount: admin.firestore.FieldValue.increment(-1)})
    }
    return;
  });

  exports.onUpdateCustomer = functions.firestore.document('/customers/{uid}')
  .onUpdate((change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = change.after.data();
    console.log("Updated data : " + JSON.stringify(newValue));
    // ...or the previous value before this update
    const previousValue = change.before.data();

     // perform desired operations ...
    if(newValue.isActive !== previousValue.isActive){
      console.log("Is Active Change . . .");
      if(newValue.company !== null ){
        console.log("Update customer count . . .");
        if(newValue.isActive){
          firestore.collection("company").doc(newValue.companyID.id).update({customerCount: admin.firestore.FieldValue.increment(1)}) 
        }else{
          firestore.collection("company").doc(newValue.companyID.id).update({customerCount: admin.firestore.FieldValue.increment(-1)})
        }
      }
    }

    return; 
  });