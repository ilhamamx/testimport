import {RootState} from '../../../../setup/redux/store'
import * as lc from '../../localstorage/index'
import * as api from '../../../../api/index'
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import * as auth from "../redux/AuthSlice";
import { FC, useEffect, useRef, useState } from 'react';
import { checkUserConnection } from '../../../../api/server/connection';

const mapState = (state: RootState) => ({auth: state.Auth})
console.log(auth.AuthSlice.actions)
const connector = connect(mapState, auth.AuthSlice.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true)
  const didRequest = useRef(false)
  const currentUser = lc.getItemLC(lc.LCName.User);
  console.log("Tetsing Auth Init ");
  const screentime = new Date().getTime();
  let unsubscribeAuth;
  useEffect(() => {
    console.log("panggil auth Init 1 : ");
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          console.log("panggil auth Init 2 : ");
          console.log("ddcurrent false ==>> : "+didRequest.current);
          if (currentUser!=null){
            console.log("panggil auth Init 3 : ");
            console.log();
            await AuthUser(currentUser)
              .then((response) => {
                dispatch(props.setAuthUser(JSON.stringify(currentUser)));
                dispatch(props.setAuth(response));
                dispatch(props.setSessionUser(screentime));
                checkUserConnection(currentUser.uid);
              });
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          //dispacth for log out
          console.log("---->>> error");
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
    }
    // eslint-disable-next-line
  }, [unsubscribeAuth])

  return showLoading ? <div>Loading...</div> : <>{props.children}</>
}
export default connector(AuthInit);

function AuthUser(currentUser:any):Promise<boolean> {
  console.log(`AuthUser ${currentUser}`);
  return api.AuthUser(currentUser)
}