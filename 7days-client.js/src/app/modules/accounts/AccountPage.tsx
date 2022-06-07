import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, Outlet, useLocation } from "react-router-dom";
import { PageLink, PageTitle } from "../../../app/layout/core";
import { Overview } from "./components/Overview";
import { Settings } from "./components/settings/Settings";
import { AccountHeader } from "./AccountHeader";
import { useTranslation } from "react-i18next";
import { getCustomerByID } from "../../../db";
import { Contact } from "../../layout/contact-management/contact-list/core/_models";

type Props = {
  id: string;
  name: string;
};

const AccountPage: React.FC = () => {
  const location = useLocation();
  const data = location.state as Props;
  const { t } = useTranslation();
  let dataContact: Contact;
  const [contactData, setContactData] = useState({});

  useEffect(() => {
    getCustomerDetail();
  }, [data]);

  const getCustomerDetail = async () => {
    if (data.id) {
      await getCustomerByID(data.id).then((doc) => {
        console.log("get customer by id " + JSON.stringify(doc));
        dataContact = doc as Contact;
        setContactData(dataContact);
        // console.log("Test : " + JSON.stringify(contactData));
      });
    }
  };

  const accountBreadCrumbs: Array<PageLink> = [
    {
      title: "Contacts",
      path: "contact/list",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  return (
    //  <>
    //   <PageTitle breadcrumbs={accountBreadCrumbs}>{data.name}</PageTitle>
    //   <AccountHeader customer={contactData}/>
    //   {currentActivity ==='overview' ? <Overview customer={contactData} /> : <></>}
    //   {currentActivity ==='settings' ? <Settings customer={contactData} /> : <></>}
    // </>
    <Routes>
      <Route
        element={
          <>
            <AccountHeader customer={contactData} />
            <Outlet />
          </>
        }
      >
        <Route
          path="overview/*"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>
                {data.name}
              </PageTitle>
              <Overview customer={contactData} />
            </>
          }
        />
        <Route
          path="settings/*"
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle>
              <Settings customer={contactData} />
            </>
          }
        />
        <Route index element={<Navigate to="contact/list" />} />
      </Route>
    </Routes>
  );
};

export default AccountPage;
