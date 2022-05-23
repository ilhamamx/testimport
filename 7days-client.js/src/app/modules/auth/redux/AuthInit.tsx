import {RootState} from '../../../../setup/redux/store'
import * as lc from '../../localstorage/index'
import * as api from '../../../../api/index'
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import * as auth from "../redux/AuthSlice";
import { FC, useEffect, useRef, useState } from 'react';

const mapState = (state: RootState) => ({auth: state.Auth})
console.log(auth.AuthSlice.actions)
const connector = connect(mapState, auth.AuthSlice.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true)
  const didRequest = useRef(false)
  let isAuthored: boolean = useSelector((state: RootState) => state.Auth.isAuth);
  const currentUser = lc.getItemLC(lc.LCName.User);
  console.log("Tetsing Auth Init ");
   
  let unsubscribeAuth;
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          console.log("ddcurrent false ==>> : "+didRequest.current);
          if (currentUser!=null){
            console.log();
            await AuthUser(currentUser)
              .then((response) => {
                dispatch(props.setAuthUser(JSON.stringify(currentUser)));
                dispatch(props.setAuth(response));
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