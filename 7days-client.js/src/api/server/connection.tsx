import * as connect from '../../db/connection'
import { useSelector } from "react-redux";
import {RootState} from '../../setup/redux/store'
import store from '../../setup/redux/store';

export const checkUserConnection = (uid: any) => {
  const userStatusDatabaseRef = connect.createFirebaseRef('status', uid)
  const userProfileRef = connect.createRef('users', uid)

  connect.onConnectionChanged((isConnected) => {
    console.log("isConnected : "+isConnected);
    if (!isConnected) {
      const now:number = new Date().getTime();
      const sessionCreated: number = store.getState().Auth.sessionCreated;
      const sreentime = (now - sessionCreated)
      console.log("---->>> Screen time : "+sreentime);
      console.log("---->>> Created At : "+sessionCreated);
      console.log("---->>> End At: "+now);
      userStatusDatabaseRef.set(connect.isOfflineForDatabase)
      return null
    }

    userStatusDatabaseRef
      .onDisconnect()
      .set(connect.isOfflineForDatabase)
      .then(_ => {
        userStatusDatabaseRef.set(connect.isOnlineForDatabase)
        userProfileRef.update(connect.isOnlineForFirestore)
      })
  })
}

export const setUserOffline = (uid: any) => {
  const userStatusDatabaseRef = connect.createFirebaseRef('status', uid)
  const now: number = new Date().getTime();
  const sessionCreated: number = store.getState().Auth.sessionCreated;
  const sreentime = (now - sessionCreated)
  console.log("Screen time2 : " + sreentime);
  console.log("Created At2 : " + sessionCreated);
  console.log("End At2: " + now);
  return userStatusDatabaseRef.set(connect.isOfflineForDatabase);
}