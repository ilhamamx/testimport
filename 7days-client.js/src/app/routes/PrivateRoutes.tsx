import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../layout/MasterLayout";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import ContactPage from "../../app/layout/contact-management/ContactPage";
import { CustomerInQueue } from "../pages/CustomerInQueue";
import { Dashboard } from "../pages/Dashboard";
import { Faq } from "../pages/FAQ";
import { HandledCustomer } from "../pages/HandledCustomer";


const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact/*" element={<ContactPage />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        <Route path="handled-customer" element={<HandledCustomer />} />
        <Route path="customer-in-queue" element={<CustomerInQueue />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Route>
    </Routes>
    // <Routes>
    //   <Route path="dashboard" element={<Dashboard />} />
    // </Routes>
  );
};
export { PrivateRoutes };