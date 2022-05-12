/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AuthRoutes } from "./AuthRoutes";
import { Dashboard } from "../pages/Dashboard";
import { ErrorsPage } from  "./ErrorRoutes";
import { MasterLayout } from "../layout/MasterLayout";
import { About } from "../pages/About";
import { Faq } from "../pages/FAQ";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

const AppRoutes: FC = () => {
  // const isAuthored = false;
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route path="error/*" element={<ErrorsPage />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route element={<MasterLayout />}>
           <Route path="dashboard" element={<Dashboard />} />
           <Route path="about" element={<About />} />
           <Route path="faq" element={<Faq />} />
        </Route>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
