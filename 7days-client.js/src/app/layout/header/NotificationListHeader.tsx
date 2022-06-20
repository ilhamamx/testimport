/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { KTSVG, getIconChannelUrl, toAbsoluteUrl } from "../../../resources/helpers";
import Avatar from "../../../styles/components/Avatar";
import { defaultNotifcation } from "../../modules/notify/Notification/model";
import { format } from "date-fns";
import { getItemLC, LCName } from "../../modules/localstorage";
import { Notification } from "../../modules/notify/Notification/model";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import "moment/locale/id";


const NotificationListHeader: FC = () => {
  const [arrNotif, setArrNotif] = useState<Notification[]>([]);
  const { t,i18n } = useTranslation();
  moment.locale(i18n.language)

  useEffect(() => {
    console.log("masuk use effect notif");
    // setArrNotif(getItemLC(LCName.Notification))
    const array = getItemLC(LCName.Notification);
    if (array) {
      console.log("masuk set array 1 >>>>>");
      setArrNotif(array);
    }
    // Respond to the `storage` event
    function storageEventHandler(event: any) {
      console.log("Event : " + JSON.stringify(event));
      setArrNotif(getItemLC(LCName.Notification));
    }

    // Hook up the event handler
    window.addEventListener("storageNotif", storageEventHandler);

    return () => {
      console.log("masuk set array 3 >>>>>");
      // Remove the handler when the component unmounts
      window.removeEventListener("storageNotif", storageEventHandler);
    };
  }, []);
  console.log("Arr Notif ===>" + JSON.stringify(arrNotif));
  // const notifications = JSON.stringify(arrNotif);
  return (
    <>
      {arrNotif != null && arrNotif.length > 0 ? (
        arrNotif.map((alert, index) => (
          <div key={`alert${index}`} className="d-flex flex-stack py-4">
            <div className="d-flex align-items-center">
              <div className="symbol symbol-35px me-4">
                <span
                  className={clsx("symbol-label", `bg-light-${alert.state}`)}
                >
                  {" "}
                  <Avatar
                    height="50"
                    width="50"
                    imgRadius="0%"
                    imgSrc={alert.avatar? alert.avatar : toAbsoluteUrl("/media/icons/avatar/def-avatar.png")}
                    // path={alert.avatar}
                    // className={`svg-icon-2 svg-icon-${alert.state}`}
                  />
                </span>
                {alert.channel && <span className="symbol-badge badge badge-circle top-100 start-100 bg-light">
                  <Avatar
                    height="18"
                    width="18"
                    imgRadius="0%"
                    imgSrc={getIconChannelUrl(alert.channel!)}
                  />
                  {/* <KTSVG path="/media/icons/channel/blibli.png"
                className="svg-icon svg-icon-2hx svg-icon-light" /> */}
                </span> }        
              </div>

              <div className="mb-0 me-2">
                <a
                  href="#"
                  className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                >
                  {alert.notifType === 'newMessage' && 'Receive new Message!'}
                  {/* Receive new Messsage */}
                </a>
                <div className="text-gray-400 fs-7">from {alert.name}</div>
              </div>
            </div>
            <div>
              <div className="ps-3">
                <span>
                  {alert.createdAt
                    ? moment(new Date(alert.createdAt.seconds*1000)).fromNow()
                    : moment(new Date()).fromNow()}
                </span>
              </div>
              {/* <h6 className='fs-8 mb-0 '>{ message.createdAt? (format(
                new Date(message.createdAt.seconds * 1000),
                "EEEE h:mm")) : (format (new Date(), "EEEE h:mm")) }</h6> */}
              <div style={{ textAlign: "right" }}>
              <button
                type="button"
                className="btn btn-primary btn-sm align-text-bottom p-7 pt-1 pb-1 mt-0 justify-content-end"
              >
                Reply
              </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>no record</p>
      )}
    </>
  );
};

export { NotificationListHeader };
