import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import cn from "classnames";
import { KTSVG } from "../../../../resources/helpers";
import createContainer from "../createContainer";
import { ReactComponent as Times } from "./times.svg";
import styles from "./Notification.module.css";
import clsx from "clsx";

const container = createContainer();

let timeToDelete = 300000;
let timeToClose = 500000 * 10;

export default function Notification({
  color = Color.info,
  autoClose = false,
  onDelete,
  children,
}) {
  const [isClosing, setIsClosing] = React.useState(false);

  React.useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(onDelete, timeToDelete);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isClosing, onDelete]);

  React.useEffect(() => {
    if (autoClose) {
      const timeoutId = setTimeout(() => setIsClosing(true), timeToClose);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [autoClose]);

  //custom notification style
  return createPortal(
    // <div className="alert alert-dismissible bg-light-primary d-flex flex-column flex-sm-row p-5 mb-10">
    //   <span className="svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0">
    //     ...
    //   </span>
    //   <div className="d-flex flex-column text-primary pe-0 pe-sm-10">
    //     <h5 className="mb-1">This is an alert</h5>
    //     <span>
    //       {/* The alert component can be used to highlight certain parts of your
    //       page for higher content visibility. */}
    //       {children}
    //     </span>
    //   </div>

    //   <button
    //     type="button"
    //     className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
    //     data-bs-dismiss="alert"
    //   >
    //     <span className="svg-icon svg-icon-1 svg-icon-primary">...</span>
    //   </button>
    // </div>,

    <div className={cn([styles.container, { [styles.shrink]: isClosing }])}>
      <div
        className={cn([
          styles.notification,
          styles[color],
          { [styles.slideIn]: !isClosing },
          { [styles.slideOut]: isClosing },
          `pt-0 pe-0 pb-0`,
        ])}
      >
        {/* {children}  */}
        <div className="alert mt-0 mb-0" role="alert">
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column">
              <KTSVG
                path="/media/icons/duotune/communication/com002.svg"
                className="svg-icon svg-icon-3hx svg-icon-light"
              />
            </div>
            <div className="px-2 pt-2">
              <h4 className="alert-heading"> Receive a Message! </h4>{" "}
            </div>
            <div className="ps-3">
              <span> today 12.00</span>
            </div>
          </div>
          {/* <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p> */}
          <hr className="my-0"></hr>
          <div className="d-flex align-items-center">
            {/* begin:: Avatar */}
            <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
              <a to="#">
                <div className={clsx("symbol-label fs-3")}>tes nama</div>
              </a>
            </div>
            <div className="pt-3 d-flex flex-column">
              <a to="#" className="text-white text-hover-primary mb-1">
                Nama Kontak
              </a>
              <p>6281234567890</p>
              {/* <span>{contact.email}</span> */}
            </div>
            <div className="align-text-bottom">
              <button type="button" className="btn btn-primary btn-sm align-text-bottom">Replay</button>
            </div>
          </div>
          {/* <p className="mb-0">{children}</p> */}
        </div>

        <button
          onClick={() => setIsClosing(true)}
          className={styles.closeButton}
        > 
          <Times height={18} />
        </button>
      </div>
    </div>,
    container
  );
}

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

Notification.propTypes = {
  notificationType: PropTypes.oneOf(Object.keys(Color)),
  autoClose: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.string,
};
