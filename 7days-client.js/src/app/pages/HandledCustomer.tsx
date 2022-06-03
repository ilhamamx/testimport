import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageLink } from "../layout/core/PageData";
import ChatWrapper from "../layout/chat/components/ChatWrapper";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Handle Customer',
    path: '/handled-customer',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
const HandledCustomer: FC = () => {
  const { t } = useTranslation();
  return (

    <>
       <PageTitle breadcrumbs={usersBreadcrumbs}>Handle Customer</PageTitle>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="handledMessage-page"> 
      </div>
      <ChatWrapper />

    </>
  );
};

export { HandledCustomer };

// 
