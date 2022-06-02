import { startIdleTransaction } from "@sentry/tracing";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { PageLink, PageTitle } from "../layout/core/PageData";

type Props = {
  id: string;
  name: string;
};

const ContactDetail: FC = () => {
  const location = useLocation();
  const data = location.state as Props
  const { t } = useTranslation();
  
  const usersBreadcrumbs: Array<PageLink> = [
    {
      title: 'Contacts',
      path: '/contact/list',
      isSeparator: false,
      isActive: false,
    }
    ,
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <>
      <PageTitle breadcrumbs={usersBreadcrumbs}>{data.name}</PageTitle>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="unhandledMessage-page"> 
        <h2>Contact Detail Page</h2>
      </div>
    </>
  );
};

export { ContactDetail };
