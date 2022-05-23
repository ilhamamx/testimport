import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { checkIsActive, KTSVG } from "../../../resources/helpers";
import { useLocation } from "react-router-dom"
import '../../../styles/css/color.css';

type Props = {
  to: string;
  title: string;
  icon?: string;
  fontIcon?: string;
  bbcount?: number;
  bbcolor?:
    | "white"
    | "primary"
    | "light"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "dark";
};

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  bbcount = 0,
  bbcolor,
}) => {
  
  const location = useLocation()
  const isActive = checkIsActive(location.pathname, to);
  let colorselect:string = "";
  if(isActive){
    colorselect = "cl-graywhite";
  }

  return (
    <div className={clsx("menu-item",colorselect)}>
      <Link className={clsx("menu-link without-sub", {active: isActive})} to={to}>
        {icon && (
          <div className="symbol symbol-50px">
            <span className="menu-icon w-40px">
              <KTSVG path={icon} className="svg-icon-2hx svg-icon-dark"/>
            </span>
            {bbcount > 0 && (
              <span className={clsx(`symbol-badge badge badge-circle bg-${bbcolor}`, "menu-bubble")}>{bbcount}</span>
            )}
          </div>
        )}
        <span className="menu-title">{title}</span>
        {bbcount > 0 && (
          <span className="menu-title menu-badge">
            <span
              className={clsx(
                "badge badge-circle fw-bolder fs-7",
                `bg-${bbcolor}`
              )}
            >
              {bbcount}
            </span>
          </span>
        )}
      </Link>
      {children}
    </div>
  );
};

export { AsideMenuItem };
