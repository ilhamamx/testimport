/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

 import { FC, useState } from "react";
 import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
 
 import { AuthRoutes } from "./AuthRoutes";
 import { Dashboard } from "../pages/Dashboard";
 import { ErrorsPage } from  "./ErrorRoutes";
 import { MasterLayout } from "../layout/MasterLayout";
 import { About } from "../pages/About";
 import { Faq } from "../pages/FAQ";
 import { PrivateRoutes } from "./PrivateRoutes";
 import * as api from "../../api";
 import { useSelector } from "react-redux";
 import {RootState} from '../../setup/redux/store'
import { App } from "../App";
// import { AuthInit } from "../modules/auth/redux/AuthInit";

 /**
  * Base URL of the website.
  *
  * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
  */
 const { PUBLIC_URL } = process.env;
 let isAuthored  = false;
 const AppRoutes: FC = () => {
   //call to redux
   //route
// call redux action Auth -> return true false
// true -> dashboard
// false -> login
  
  // const isAuthored = api.AuthTest();
  // const isAuthored = false;
  const isAuthored: boolean = useSelector((state: RootState) => state.Auth.isAuth);
  // const isAuthored: boolean = useSelector((state: RootState) => state.Auth.isAuth);
  // console.log('Redux is Auth : ' + isAuth);
  console.log('App route is auth: ' + isAuthored);
   
   return (
     <BrowserRouter basename={PUBLIC_URL}>
       <Routes>
        {/* <Route element={<App />}> */}
          <Route path="error/*" element={<ErrorsPage />} />
          {/* <Route path="auth/*" element={<AuthRoutes />} /> */}
          {isAuthored ? 
          <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
              {console.log('-------------------------------> masuk dashboard')}
          </>: <>
              <Route path="auth/*" element={<AuthRoutes />} />
              <Route path="*" element={<Navigate to="/auth" />} />
              {console.log('-------------------------------> masuk auth')}
            </>}
          
          <Route path="*" element={<Navigate to="/error" />} />
        {/* </Route> */}
       </Routes>
     </BrowserRouter>
   );
 };
 
 export { AppRoutes };