import axios from "axios";
import * as connect from "../../db/connection";

export const checkUserConnection = (uid: any, sessionid: string) => {
  const userStatusDatabaseRef = connect.createFirebaseRef("status", uid);
  const userProfileRef = connect.createRef("users", uid);

  connect.onConnectionChanged((isConnected) => {
    if (!isConnected) {
      userStatusDatabaseRef.set(connect.isOfflineForDatabase(sessionid));
      return null;
    }

    userStatusDatabaseRef
      .onDisconnect()
      .set(connect.isOfflineForDatabase(sessionid))
      .then((_) => {
        userStatusDatabaseRef.set(connect.isOnlineForDatabase(sessionid));
        userProfileRef.update(connect.isOnlineForFirestore(sessionid));
      });
  });
};

export const setUserOffline = (uid: any, sessionid: string ) => {
  const userStatusDatabaseRef = connect.createFirebaseRef("status", uid);
  return userStatusDatabaseRef.set(connect.isOfflineForDatabase(sessionid));
};

export const sendMessage = async(jsonMessage: string, callback: any) => {

  const url = "http://localhost:3001/messages/sendMessage";
  // const token = "$2a$10$gtpkSOpm5dadvQgF4f4FP.apK6mlyhFoPrUMQ/dejkKjld0VPWS";

  const token = "$2a$10$gtpkSOpm5dadvQgF4f4FP.apK6mlyhFoPrU1EMQ/dejkKjld0VPWS";

  let defaultResponse = `
  {
    "responseCode" : <<responseCode>>,
    "response" : <<response>>
  }`;

  try {
    await axios.post(url, JSON.parse(jsonMessage), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization:
          `Bearer ${token}`,
      },
    }).then((response) => {
      const responseJson = response.data;
      const responseCode = response.status;
      callback(responseCode, responseJson);
    }
    ).catch((error) => {
      callback(error.response.status, error.response.data);
    }
    );
  } catch (error) {
  }
}