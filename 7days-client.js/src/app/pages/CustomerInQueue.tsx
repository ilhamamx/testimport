import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PageLink, PageTitle } from "../layout/core/PageData";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Customer in Queue',
    path: '/customer-in-queue',
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

const CustomerInQueue: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle breadcrumbs={usersBreadcrumbs}>Customer in Queue</PageTitle>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="unhandledMessage-page"> 
        <h2>Unhandled Message Page</h2>
      </div>
    </>
  );
};

export { CustomerInQueue };
