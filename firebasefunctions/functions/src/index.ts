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
