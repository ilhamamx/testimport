import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ContactsListHeader } from "../layout/user-management/users-list/components/header/UsersListHeader"

const Contact: FC = () => {
  const { t } = useTranslation();
  return (
    <ContactsListHeader />
    // <>
    //   <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="Contact-page"> 
    //     <h2>Contact Page</h2>
    //   </div>
    // </>
  );
};

export { Contact };