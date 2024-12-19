import React, { useEffect } from "react";
import "./Notification.css";
import useNotification from "../../hooks/useNotification";
import Button from "../forms/Button";

const Notification = () => {
  const { hideNotification, notification } = useNotification();
  
  //if there are no actions in the notification, it will disappear after 5 seconds
  useEffect(() => {
    if (notification?.actions.length === 0) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hideNotification, notification]);


  if (notification) {
    const { message, actions } = notification || {};
    return (
      <div className="notification-container">
        <div className="notification">
          {message}
          {actions.map(({ label, action }) => (
            <Button
              className="btn-notification"
              onClick={() => {
                action();
                hideNotification();
              }}
            >
              {label}
            </Button>
          ))}
          {actions.length === 0 && (
            <Button className="btn-notification" onClick={hideNotification}>
              Close
            </Button>
          )}
        </div>
      </div>
    );
  }
};

export default Notification;
