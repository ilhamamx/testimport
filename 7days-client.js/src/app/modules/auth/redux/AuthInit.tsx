import {RootState} from '../../../../setup/redux/store'
// import * as cookies from '../../cookies/index'
import * as api from '../../../../api/index'
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import * as auth from "../redux/AuthSlice";
import { FC, useEffect, useRef, useState } from 'react';

const mapState = (state: RootState) => ({auth: state.Auth})
const connector = connect(mapState, auth.AuthSlice.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(true)
  const didRequest = useRef(false)
  let isAuthored: boolean = useSelector((state: RootState) => state.Auth.isAuth);
  console.log("Hasil user from Redux Auth Init : "+isAuthored);
   // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      // const currentUser = cookies.getCookie(cookies.cookiesName.Persistance);
      const currentUser = window.localStorage.getItem('currentUser');
      console.log("Hasil user from cookies Auth Init : "+currentUser);
      try {
        if (!didRequest.current) {
          if (currentUser!=null){
            console.log(">>>>>>>"+api.AuthUser(currentUser));
            dispatch(props.setAuth(isAuthored))
            
            // AuthUser(currentUser).then((response) => {
            //   console.log("===>> Reponse OnAuth Firebase : "+response);       
            //   dispatch(props.setAuth(isAuthored))
            // });
            // console.log("Hasil Check Firebase : "+isAuthored);
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

    if (!isAuthored) {
      console.log("====>> Call Request User");
      requestUser()
    } else {
      //dispacth for log out
      console.log("=====>> Call Logout");
      dispatch(props.setAuth(false))
      setShowLoading(false)
    }
    // eslint-disable-next-line
  }, [didRequest])
  return showLoading ? <div>Loading...</div> : <>{props.children}</>
}

export default connector(AuthInit);

function AuthUser(currentUser:any):Promise<boolean> {
  console.log(`AuthUser ${currentUser}`);
  return api.AuthUser2(currentUser)
}