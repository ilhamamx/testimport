import { LCName } from "../../app/modules/localstorage";
import * as connect from "../../db/connection";
import { updateSession } from "../../db/session";
import store from "../../setup/redux/store";
import * as lc from "../../app/modules/localstorage/index";

export const checkUserConnection = (uid: any) => {
  const userStatusDatabaseRef = connect.createFirebaseRef("status", uid);
  const userProfileRef = connect.createRef("users", uid);

  connect.onConnectionChanged((isConnected) => {
    if (!isConnected) {
      userStatusDatabaseRef.set(connect.isOfflineForDatabase);
      return null;
    }

    userStatusDatabaseRef
      .onDisconnect()
      .set(connect.isOfflineForDatabase)
      .then((_) => {
        userStatusDatabaseRef.set(connect.isOnlineForDatabase);
        userProfileRef.update(connect.isOnlineForFirestore);
      });
  });
};

export const setUserOffline = (uid: any) => {
  const userStatusDatabaseRef = connect.createFirebaseRef("status", uid);
  return userStatusDatabaseRef.set(connect.isOfflineForDatabase);
};
