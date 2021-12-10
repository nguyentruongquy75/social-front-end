import React from "react";

import styles from "./Notification.module.css";

export default function Notification(props) {
  const notification = props.notification;
  return (
    <div
      className={`${styles.notification} ${
        notification.isRead ? "" : styles["unread"]
      } ${props.className ? props.className : ""}`}
    >
      <div className={styles["notification__img"]}>
        <img
          src="https://images.unsplash.com/photo-1638624269877-1f8b55da3e71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className={styles["notification__info"]}>
        <p className={styles["notification__title"]}>{notification.title}</p>
        <span className={styles["notification__time"]}>1 phút trước</span>
      </div>
    </div>
  );
}
