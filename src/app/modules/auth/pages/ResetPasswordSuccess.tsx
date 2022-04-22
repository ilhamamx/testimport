import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../resources/helpers/AssetHelpers";

export function ResetPasswordSuccess() {
  const { t } = useTranslation();
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-left h-100 p-10 p-lg-15">
      <h1 className="text-dark text-center mb-5 mt">
        {t("PasswordChanged.Info.Header")}
      </h1>
      <div className="text-gray-400 text-center fw-bold fs-4 mb-5">
        {t("PasswordChanged.Info.Success")}
      </div>
      <div className="text-center mt-5">
        <Link
          to="/auth"
          id="rpasswordsuccess-signin"
          className="btn btn-lg btn-primary fw-bolder"
        >
          {t("PasswordChanged.Button.SignIn")}
        </Link>
      </div>
      <div className="text-center">
        <img
          alt="AssetPwEntry"
          className="img-fluid mx-auto fixed-bottom w-50 h-50"
          src={toAbsoluteUrl("/media/logos/passwordischanged.svg")}
        ></img>
      </div>
    </div>
  );
}
