import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../modules/auth/pages/Dashboard";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};
export { PrivateRoutes };
