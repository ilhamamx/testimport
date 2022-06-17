/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toAbsoluteUrl } from "../../resources/helpers/AssetHelpers";
import { useTranslation } from "react-i18next";

export const AuthLayout = () => {
  const { t, i18n } = useTranslation();

  // function changeLanguage(lng: string) {
  //   i18n.changeLanguage(lng);
  // }
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  return (
    <div
      className="d-flex flex-column -column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
      style={{
        backgroundImage: `url(${toAbsoluteUrl(
          "/media/illustrations/sketchy-1/14.png"
        )})`,
      }}
    >
      {/* begin::Content */}
      <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
        {/* begin::Logo */}
        <a href="#" className="mb-12">
          <img
            alt="Logo"
            src={toAbsoluteUrl("/media/logos/logo-sevendays-with-text.svg")}
            className="h-90px"
          />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className="d-flex flex-center flex-column-auto p-10">
        <div className="d-flex align-items-center fw-bold fs-6">
          <a href="#" className="text-muted text-hover-primary px-2">
            {t("Layout.Link.About")}
          </a>
          <a href="#" className="text-muted text-hover-primary px-2">
            {t("Layout.Link.Products")}
          </a>
          <a href="#" className="text-muted text-hover-primary px-2">
            {t("Layout.Link.ContactUs")}
          </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  );
};
