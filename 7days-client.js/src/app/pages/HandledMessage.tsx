import { FC } from "react";
import { useTranslation } from "react-i18next";

const HandledMessage: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="handledMessage-page"> 
        <h2>Handled Message Page</h2>
      </div>
    </>
  );
};

export { HandledMessage };
