import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../resources/helpers/AssetHelpers";
import Button from "../../../../styles/components/Button";

export function ResetPasswordSuccess() {
  const { t } = useTranslation();
  const nav = useNavigate();
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  function signInButton() {
    nav("/login");
  }

  return (
    <div className="d-flex flex-column flex-left h-100 p-10 p-lg-15">
      <h1 className="text-dark text-center mb-5 mt">
        {t("PasswordChanged.Info.Header")}
      </h1>
      <div className="text-gray-400 text-center fw-bold fs-4 mb-5">
        {t("PasswordChanged.Info.Success")}
      </div>
      <div className="text-center mt-5">
        <Button id="signin-button" btnlg="primary" onClick={signInButton}>
          {t("PasswordChanged.Button.SignIn")}
        </Button>
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
