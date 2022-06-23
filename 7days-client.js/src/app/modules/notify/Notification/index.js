import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import cn from "classnames";
import { getIconChannelUrl, KTSVG, toAbsoluteUrl } from "../../../../resources/helpers";
import createContainer from "../createContainer";
import { ReactComponent as Times } from "./times.svg";
import styles from "./Notification.module.css";
import Avatar from "../../../../styles/components/Avatar";
import { Contact } from "../../../layout/contact-management/contact-list/core/_models";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import "moment/locale/id";
import { useDispatch } from "react-redux";
import * as chat from "../../../../app/modules/chat/redux/ChatSlice"
import { Link, useLocation } from "react-router-dom";

const container = createContainer();
let timeToDelete = 1000;
let timeToClose = 1000 * 10;

export default function Notification ({
  color = Color.info,
  autoClose = false,
  onDelete,
  children,
  message,
  contact,
}) {
  const [isClosing, setIsClosing] = React.useState(false);
  const dispatch = useDispatch();
  const { t,i18n } = useTranslation();
  moment.locale(i18n.language)

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
          `pt-0 pe-0 pb-0 m-3`,
        ])}
      >
        {/* <label
          className="btn btn-icon btn-circle btn-active-color-primary w-20px h-20px shadow top-0 start-0 translate-middle flex-fill" //
          title="closeNotif"
          style={{backgroundColor: "#565674"}}
          
          onClick={() => setIsClosing(true)}
        >
          <i className="bi bi-x fw-bold fs-6"></i>
        </label> */}
        {/* {children}  */}
        <div className="alert mt-0 mb-0" role="alert">
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column">
              <KTSVG
                path="/media/icons/duotune/communication/com002.svg"
                className="svg-icon svg-icon-2hx svg-icon-light"
              />
            </div>
            <div className="px-2 pt-2">
              <h6 className="alert-heading"> {t("Notif.Info.Message")} </h6>{" "}
            </div>
            <div className="ps-3">
              <span>
                {message.createdAt
                  ? moment(new Date(message.createdAt.seconds * 1000)).fromNow()
                  : moment(new Date()).fromNow()}
              </span>
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
            <div className="symbol symbol symbol-40px me-4">
              <div className="symbol-label fs-3 fw-bold">
                <img
                  src={
                    contact.avatar
                      ? `${contact.avatar}`
                      : toAbsoluteUrl("/media/icons/avatar/def-avatar.png")
                  }
                  alt={contact.firstName}
                  className="w-75"
                ></img>
              </div>
              <span className="symbol-badge badge badge-circle top-100 start-100 bg-light">
                <Avatar
                  height="18"
                  width="18"
                  imgRadius="0%"
                  imgSrc={getIconChannelUrl(message.channel)}
                />
                {/* <KTSVG path="/media/icons/channel/blibli.png"
                className="svg-icon svg-icon-2hx svg-icon-light" /> */}
              </span>
              {/* <a to="#"> */}
              {/* <div className={clsx("symbol-label fs-3")}>tes nama</div>
                <span className="badge badge-circle bg-danger position-absolute top-100 start-100 translate-middle">3</span> */}
              {/* <span className="badge badge-circle badge-white">5</span> */}
              {/* <span className="badge badge-circle bg-info"></span> */}
              {/* <Icon
                  id="icon-handled-customer"
                  imgSrc="/media/icons/duotune/communication/com002.svg"
                  size="4hx"
                  badgeStyle="bg-danger"
                  
                ></Icon> */}
              {/* <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                </span> */}

              {/* </a> */}
            </div>
            <div className="pt-3 d-flex flex-column mt-2">
              <a to="#" className="text-white text-hover-primary mb-0">
                {contact.lastName
                  ? contact.firstName + " " + contact.lastName
                  : contact.firstName}
              </a>
              <p>{contact.phoneNumber}</p>
              {/* <span>{contact.email}</span> */}
            </div>
            <div className="align-text-bottom list-inline mb-4 mb-lg-1 d-flex flex-row justify-content-end flex-fill w-auto ">
              <a
                href="/handled-customer"
                onClick={() => {
                  console.log("masuk dispatch");
                  dispatch(chat.setSelectedChat(message.collaboration.id));
                }}
                className="btn btn-primary btn-sm align-text-bottom p-7 pt-1 pb-1 mt-2"
              >
                {t("Notif.Button.Reply")}
              </a>
            </div>
          </div>
          {/* <p className="mb-0">{children}</p> */}
        </div>
        <button
          onClick={() => setIsClosing(true)}
          // className= "btn btn-info btn-circle translate-middle"
          className={cn([styles.closeButton, `translate-middle`])}
        >
          <Times height={14} />
          {/* <i className="bi bi-x fw-bold fs-6"></i> */}
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
  message: PropTypes.any,
  contact: PropTypes.any,
};
