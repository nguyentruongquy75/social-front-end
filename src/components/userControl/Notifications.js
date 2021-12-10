import React, { useContext, useEffect, useRef, useState } from "react";
import { API_user } from "../../config";

import userContext from "../../context/userCtx";
import Notification from "../notification/Notification";
import Card from "../ui/Card";

import styles from "./Notifications.module.css";

// socket
import socket from "../../socket";

export default function Notifications(props) {
  const context = useContext(userContext);
  const cardRef = useRef();
  const iconRef = useRef();

  const [notifiactions, setNotifications] = useState([]);
  const [isDisplayNotifications, setIsDisplayNotifications] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const [popupNotification, setPopupNotification] = useState(null);

  const changeNotification = () => setHasChange((hasChange) => !hasChange);

  const toggleDisplayNotifications = () =>
    setIsDisplayNotifications((isDisplay) => !isDisplay);

  // unread notifications
  const unreadNotifiacations = notifiactions
    .filter((notification) => !notification.isRead)
    .map((notification) => notification._id);

  // fecth api
  useEffect(async () => {
    try {
      const respose = await fetch(`${API_user}/${context.id}/notifications`);
      const notifiactions = await respose.json();

      setNotifications(notifiactions);
    } catch (error) {
      console.log(error);
    }
  }, [context, hasChange]);

  // click outside
  const handleClickOutside = (e) => {
    if (
      cardRef.current &&
      !cardRef.current.contains(e.target) &&
      !iconRef.current.contains(e.target)
    ) {
      setIsDisplayNotifications(false);
    }
  };

  // add event mouse down
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  // read notification
  useEffect(async () => {
    if (unreadNotifiacations.length > 0) {
      await fetch(`${API_user}/${context.id}/notifications`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notifications: unreadNotifiacations,
        }),
      });
      changeNotification();
    }
  }, [isDisplayNotifications]);

  // socket notification

  socket.on(context.id, (data) => {
    changeNotification();
    setPopupNotification(data);
  });

  // remove popup
  useEffect(() => {
    if (popupNotification) {
      const id = setTimeout(() => {
        setPopupNotification(null);
      }, 4000);

      return () => clearTimeout(id);
    }
  }, [popupNotification]);

  return (
    <>
      <li
        ref={iconRef}
        className={isDisplayNotifications && props.active}
        onClick={toggleDisplayNotifications}
      >
        <i className="far fa-bell"></i>
        {unreadNotifiacations.length > 0 && (
          <div className={props.count}>{unreadNotifiacations.length}</div>
        )}
      </li>
      {isDisplayNotifications && (
        <Card ref={cardRef} className={styles.notifications}>
          <div className={styles["notifications__top"]}>
            <h3>Thông báo</h3>
          </div>
          {notifiactions.map((noti) => (
            <Notification key={noti._id} notification={noti} />
          ))}
        </Card>
      )}
      {popupNotification && (
        <Notification
          className={styles.popup}
          notification={popupNotification}
        />
      )}
    </>
  );
}
