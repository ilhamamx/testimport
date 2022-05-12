import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { toAbsoluteUrl } from "../../../resources/helpers/AssetHelpers";

export const ErrorsLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  function getLocation(): string {
    return location.pathname;
  }

  let imgSrc = null;
  let imgSrcBg = null;
  if (getLocation() === "/error/500") {
    imgSrcBg = "/media/logos/Error500bg.svg";
    imgSrc = "/media/logos/Brokencar.svg";
  } else {
    imgSrcBg = "/media/logos/Error404bg.svg";
    imgSrc = "/media/logos/S_error404.svg";
  }

  return (
    <div
      className="d-flex justify-content-center flex-column flex-root h-100"
      style={{
        backgroundImage: `url('${toAbsoluteUrl(`${imgSrcBg}`)}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw 100vh",
      }}
    >
      <div className="d-flex flex-column text-center">
        <img
          src={toAbsoluteUrl(`${imgSrc}`)}
          className="
          d-flex
          flex-row-auto
          bgi-no-repeat
          bgi-position-x-center
          bgi-size-contain
          img-fluid
          img-responsive
          mx-auto
          d-block
        "
          width={600}
          alt="error"
        />
        <div className="pt-lg-10 mb-10">
          <Outlet />
          <div className="text-center">
            <Link to="/auth" className="btn btn-lg btn-primary fw-bolder">
              {t("404.Button.Homepage")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
