import React from "react";
import PropTypes from "prop-types";

import Notification from "./Notification";

export default function NotificationsManager({ setNotify }) {
  let [notifications, setNotifications] = React.useState([]);

  let createNotification = ({ color, autoClose, children, message, contact}) => {
    setNotifications((prevNotifications) => {
      return [{
        children,
        color,
        autoClose,
        message, 
        contact,
        id: prevNotifications.length,
      },
        ...prevNotifications,
      ];
    });
  };

  React.useEffect(() => {
    setNotify(({ color, autoClose, children, message, contact }) =>
      createNotification({ color, autoClose, children, message, contact })
    );
  }, [setNotify]);

  let deleteNotification = (id) => {
    const filteredNotifications = notifications.filter(
      (_, index) => id !== index,
      []
    );
    setNotifications(filteredNotifications);
  };

  return notifications.map(({ id, ...props }, index) => (
    <Notification
      key={id}
      onDelete={() => deleteNotification(index)}
      {...props}
    />
  ));
}

NotificationsManager.propTypes = {
  setNotify: PropTypes.func.isRequired,
};
