import { FC } from "react";
import { useTranslation } from "react-i18next";

const Faq: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="faq-page">
        <h2>FAQ Page</h2>
      </div>
    </>
  );
};

export { Faq };