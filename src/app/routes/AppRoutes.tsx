/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

 import {FC} from 'react'
 import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
 
import {AuthPage} from '../modules/auth/AuthLayout'
 
 /**
  * Base URL of the website.
  *
  * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
  */
 const {PUBLIC_URL} = process.env
 
 const AppRoutes: FC = () => {
   const isAuthored = false;
   return (
     <BrowserRouter basename={PUBLIC_URL}>
       <Routes>
          <Route path='auth/*' element={<AuthPage />} />
          <Route path='*' element={<Navigate to='/auth' />} />
       </Routes>
     </BrowserRouter>
   )
 }
 
 export {AppRoutes}
 