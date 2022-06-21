import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../layout/MasterLayout";
import { About } from "../pages/About";
import ContacsListPage from "../../app/layout/contact-management/ContactPage";
import { CustomerInQueue } from "../pages/CustomerInQueue";
import { Dashboard } from "../pages/Dashboard";
import { Faq } from "../pages/FAQ";
import { HandledCustomer } from "../pages/HandledCustomer";
import { ContactDetail } from "../pages/ContactDetail";
import AccountPage from "../modules/accounts/AccountPage"
import { useEffect, useState } from "react";
import { subsToMessages } from "../../api/firebase";
import { Message } from "../../app/layout/chat/models/ChatItem.model";
import { infoNewMessage } from "../modules/notify";
import { getItemLC } from "../modules/localstorage";
import { Contact } from "../layout/contact-management/contact-list/core/_models";
import { useDispatch } from "react-redux";
import * as chat from "../modules/chat/redux/ChatSlice";

const PrivateRoutes = () => {

  const userId = getItemLC("UID");
  console.log("Local Storage private route ===>>" + userId);
  let message: any;
  const dispatch = useDispatch();

  const onNewData = (messageContent: Message, customer: Contact) => {
    // TODO: tampilkan notification
    console.log("new Notif Exists : ", message);
    dispatch(chat.setSelectedChat(messageContent.collaboration!.id))
    dispatch(chat.addIncomingMessages(messageContent))
    message = messageContent.textContent;
    infoNewMessage(message, true, messageContent, customer);
  };

  // const [notifications, setNotifications] = useState<any>([]);
  useEffect(() => {
    // const unsubs = subsToCollaborations(userId, onNewData);
    const unsubs = subsToMessages(userId, onNewData);

    return () => {
      unsubs();
    };
  }, []);


  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact/*" element={<ContacsListPage />} />
        <Route path="contact/contact-detail/*" element={<AccountPage />} />
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