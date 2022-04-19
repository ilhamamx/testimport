
import { Route, Routes } from "react-router-dom";
import { Login } from "../modules/auth/pages/Login";
import { AuthLayout } from "../layout/AuthLayout";
import { ForgotPassword } from "../modules/auth/pages/ForgotPassword";

const AuthRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthRoutes };