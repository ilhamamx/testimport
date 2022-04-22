import { FC } from "react";
import { useTranslation } from "react-i18next";

const Error404: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fw-bold fs-3 text-gray-400 mb-15">
        {t("404.Info.NoService")}
      </div>
    </>
  );
};

export { Error404 };
