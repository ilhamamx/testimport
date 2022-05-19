/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

 import { FC } from "react";
 import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
 
 import { AuthRoutes } from "./AuthRoutes";
 import { ErrorsPage } from  "./ErrorRoutes";
 import { PrivateRoutes } from "./PrivateRoutes";
 import { useSelector } from "react-redux";
 import {RootState} from '../../setup/redux/store'
import { App } from "../App";

 /**
  * Base URL of the website.
  *
  * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
  */
 const { PUBLIC_URL } = process.env;
 const AppRoutes: FC = () => {
  
  const isAuthored: boolean = useSelector((state: RootState) => state.Auth.isAuth);
  console.log('App route is auth: ' + isAuthored);   
   return (
     <BrowserRouter basename={PUBLIC_URL}>
       <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          {/* <Route path="auth/*" element={<AuthRoutes />} /> */}
          {isAuthored ? 
          <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
          </>: <>
              <Route path="auth/*" element={<AuthRoutes />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>}
        </Route>
       </Routes>
     </BrowserRouter>
   );
 };
 
 export { AppRoutes };