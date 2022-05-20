import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../layout/MasterLayout";
import { About } from "../pages/About";
import { Contacts } from "../pages/Contacts";
import { Dashboard } from "../pages/Dashboard";
import { Faq } from "../pages/FAQ";
import { HandleChat } from "../pages/HandleChat";
import { UnhandleChat } from "../pages/UnhandleChat";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
      <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="unhandlechat" element={<UnhandleChat/>} />
        <Route path="chat" element={<HandleChat />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<Faq />} />
      </Route>
    </Routes>
    // <Routes>
    //   <Route path="dashboard" element={<Dashboard />} />
    // </Routes>
  );
};
export { PrivateRoutes };
