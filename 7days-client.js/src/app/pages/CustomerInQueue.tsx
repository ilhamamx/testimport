import { FC } from "react";
import { useTranslation } from "react-i18next";

const CustomerInQueue: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="unhandledMessage-page"> 
        <h2>Unhandled Message Page</h2>
      </div>
    </>
  );
};

export { CustomerInQueue };
