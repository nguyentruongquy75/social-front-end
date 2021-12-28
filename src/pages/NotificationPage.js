import React, { useContext, useEffect, useState } from "react";
import Notification from "../components/notification/Notification";
import { API_user } from "../config";
import userContext from "../context/userCtx";

import socket from "../socket";

import styles from "./NotificationPage.module.css";

export default function NotificationPage() {
  const context = useContext(userContext);

  const [dataSocket, setDataSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // unread notifications
  const unreadNotifiacations = notifications
    .filter((notification) => !notification.isRead)
    .map((notification) => notification._id);

  // fetch data
  useEffect(async () => {
    try {
      const respose = await fetch(`${API_user}/${context.id}/notifications`);
      const notifiactions = await respose.json();

      setNotifications(notifiactions);
    } catch (error) {
      console.log(error);
    } finally {
      setDataSocket(null);
    }
  }, [dataSocket]);

  // update notification read

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
    }
  }, [notifications]);

  socket.on(`${context.id}notification`, (data) => {
    setDataSocket(data);
  });

  return (
    <div className={styles["container"]}>
      <h6 className={styles["heading"]}>Thông báo</h6>

      <div>
        {notifications.length === 0 && (
          <div className={styles.message}>Chưa có thông báo nào</div>
        )}
        {notifications.map((noti) => (
          <Notification notification={noti} />
        ))}
      </div>
    </div>
  );
}
