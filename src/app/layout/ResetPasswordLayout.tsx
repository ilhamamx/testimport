import { Navigate, Outlet } from "react-router-dom";
import { toAbsoluteUrl } from "../../resources/helpers/AssetHelpers";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const ResetPasswordLayout = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  // return (<Outlet /> !== null) ? renderLayout() : <Navigate to={"/login"} />;

  // function renderLayout() {
    return (
      <div className="d-flex flex-row h-100">
        <div className="d-flex flex-column flex-center w-50">
          <div className="d-flex flex-column flex-left h-50 p-10 p-lg-15">
            <div className="w-lg-50px">
              <img
                alt="Logo"
                className="w-100 h-100 logo"
                src={toAbsoluteUrl("/media/logos/icon-logo-7days.svg")}
              ></img>
            </div>
            <h1 className="text-dark text-left mb-3">
              {" "}
              {t("PasswordEntry.Info.Header")}
            </h1>
            <div className="text-gray-400 fw-bold fs-4">
              {t("PasswordEntry.Info.InsertPassword")}
            </div>
            <div className="w-lg-75">
              <img
                alt="AssetPwEntry"
                className="w-100 h-100"
                src={toAbsoluteUrl(
                  "/media/illustrations/sketchy-1/AssetPwEntry.png"
                )}
              ></img>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-column-fluid flex-center w-50">
          <div className="d-flex flex-column w-lg-500px h-50 bg-white rounded shadow-sm p-10 p-lg-15">
            <Outlet />
            {/* {<Outlet /> !== null ? <Outlet /> : <Navigate to={"/login"} />} */}
          </div>
        </div>
      </div>
    );
  // }
};
