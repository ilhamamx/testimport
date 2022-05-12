import { FC } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "../../styles/components/Avatar";
import { toAbsoluteUrl } from "../../resources/helpers/AssetHelpers";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";

const About: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="fw-bold fs-3 text-gray-400 mb-15" data-testid="about-page">
      <h2>About Page</h2>
      <div className="dropdown">
        <img
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          alt="arroy-right"
          src="data:image/png;base64,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"
          style={{
            width: "25px",
            height: "25px",
            marginTop: "50px",
            marginLeft: "15px",
          }}
        ></img>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { About };
