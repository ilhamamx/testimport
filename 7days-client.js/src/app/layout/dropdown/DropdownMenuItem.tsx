import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { checkIsActive } from "../../../resources/helpers";
import { useLocation } from "react-router-dom";
import "../../../styles/css/color.css";

type Props = {
  to: string;
  title: string;
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

const DropdownMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  bbcount = 0,
  bbcolor,
}) => {
  const location = useLocation();
  const isActive = checkIsActive(location.pathname, to);
  // let colorselect: string = "";
  // if (isActive) {
  //   colorselect = "cl-graywhite";
  // }

  return (
    <div className="menu-item px-5">
      <Link className={clsx("menu-link without-sub", {active: isActive})} to={to}>
        <span className="menu-text">{title}</span>
        <span className="menu-badge">
          {bbcount > 0 && (
            <span className="menu-title menu-badge">
              <span
                className={clsx(
                  "badge badge-circle fw-bolder fs-7",
                  `badge-light-${bbcolor}`
                )}
              >
                {bbcount}
              </span>
            </span>
          )}
        </span>
      </Link>
    </div>
  );
};

export { DropdownMenuItem };
