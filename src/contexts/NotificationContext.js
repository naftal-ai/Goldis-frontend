// NotificationContext.js
import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();



export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, actions = [], type = 'info') => {
    console.log(message)
    setNotification({ message, actions, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
