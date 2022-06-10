import { RootState } from '../../../../setup/redux/store'
import * as lc from '../../localstorage/index'
import * as api from '../../../../api/index'
import { connect, ConnectedProps, useDispatch } from "react-redux";
import * as auth from "../redux/AuthSlice";
import { FC, useEffect, useRef, useState } from 'react';
import { checkUserConnection, setUserOffline } from '../../../../api/server/connection';
import { getUserSessionToken } from '../../../../db/session';
import { logout } from '../../../../api/index';
import * as Log from "../../../../util/SDayslogger"
import { useNavigate } from 'react-router-dom';

const mapState = (state: RootState) => ({ auth: state.Auth })
const connector = connect(mapState, auth.AuthSlice.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true)
  const didRequest = useRef(false)
  let userSessionToken = lc.getItemLC(lc.LCName.SessionToken);
  const currentUser = lc.getItemLC(lc.LCName.User);
  const nav = useNavigate();
  // let requestUser;
  useEffect(() => {
    const screentime = new Date().getTime();
    const sessionid = lc.getItemLC(lc.LCName.SessionID);
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          if (currentUser != null) {
            await AuthUser(currentUser)
              .then((response) => {
                dispatch(props.setAuthUser(JSON.stringify(currentUser)));
                dispatch(props.setAuth(response));
                dispatch(props.setSessionUser(screentime));
                checkUserConnection(currentUser.uid, sessionid);
              });
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          //dispacth for log out
          dispatch(props.setAuth(false))
        }
      } finally {
        setShowLoading(false)
      }
      return () => (didRequest.current = true)
    }

    if (currentUser) {
      requestUser()
    } else {
      //dispacth for log out
      dispatch(props.setAuth(false))
      setShowLoading(false)
      lc.removeSession();
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (currentUser === null && userSessionToken === null) {
      dispatch(props.setAuth(false))
    }
    if (userSessionToken !== null && currentUser !== null) {
      let session = async () => {
        await getSessionToken(currentUser.uid)
          .then((response) => {
            if (response) {
              if (userSessionToken !== response) {
                userSessionToken = null;
                logout()
                  .then(() => {
                    const user = lc.getItemLC(lc.LCName.User);
                    const sessionid = lc.getItemLC(lc.LCName.SessionID);
                    dispatch(props.deleteUser());
                    lc.removeSession()
                    dispatch(props.setAuth(false));
                    alert("You are loggin in other device");
                    // window.location.reload();
                    nav("/auth")
                  })
                  .catch((error) => {
                    console.log("error: " + error);
                    Log.SDayslogger(
                      nav,
                      "Testing Error Message",
                      Log.SDLOGGER_INFO,
                      false,

                      true
                    );
                    console.log("failed logout");

                  });
              }
            }
          });
      }
      session();
    }
  }, [nav])
  return showLoading ? <div>Loading...</div> : <>{props.children}</>
}
export default connector(AuthInit);

function AuthUser(currentUser: any): Promise<boolean> {
  console.log(`AuthUser ${currentUser}`);
  return api.AuthUser(currentUser)
}

async function getSessionToken(uid: string): Promise<string> {
  console.log(`UID User ${uid}`);
  return await getUserSessionToken(uid)
}
