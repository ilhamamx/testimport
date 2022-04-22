import { FC } from "react";
import { useTranslation } from "react-i18next";

const Error500: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fw-bold fs-3 text-gray-400 mb-15">
        {t("500.Info.ServerError")}
      </div>
    </>
  );
};

export { Error500 };
