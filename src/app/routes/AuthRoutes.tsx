
import { Route, Routes } from "react-router-dom";
import { Login } from "../modules/auth/pages/Login";
import { AuthLayout } from "../layout/AuthLayout";

const AuthRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthRoutes };