import { FC } from "react";
import { useTranslation } from "react-i18next";

const Contact: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="Contact-page"> 
        <h2>Contact Page test</h2>
      </div>
    </>
  );
};

export { Contact };