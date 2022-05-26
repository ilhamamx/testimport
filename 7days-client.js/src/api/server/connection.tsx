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
