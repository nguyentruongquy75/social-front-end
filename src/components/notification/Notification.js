import React from "react";

import styles from "./Notification.module.css";

import reactions from "../../reactions";
import { Link } from "react-router-dom";

export default function Notification(props) {
  const notification = props.notification;

  const duration = Date.now() - new Date(notification.createAt);

  const convertDurationToString = (duration) => {
    const seconds = duration / 1000;
    const minutes = seconds / 60;

    if (seconds < 60) {
      return "Vừa xong";
    }

    if (minutes < 60) {
      return `${Math.floor(minutes)} phút trước`;
    }
    const hours = minutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)} giờ trước`;
    }

    const days = hours / 24;

    return `${Math.floor(days)} ngày trước`;
  };

  const durationText = convertDurationToString(duration);

  return (
    notification && (
      <Link
        to={`/posts/${notification.postId}${
          notification.forComment ? `#${notification.forComment}` : ""
        }`}
        className={styles["notification__link"]}
        onClick={props.onClose}
      >
        <div
          className={`${styles.notification} ${
            notification.isRead ? "" : styles["unread"]
          } ${props.className ? props.className : ""}`}
        >
          <div className={styles["notification__img"]}>
            <img
              src={notification.user.avatar}
              alt={notification.user.fullName}
            />
            <div
              className={`${styles["notification__type"]} ${
                styles["notification__type--" + notification.type]
              }`}
            >
              {notification.type === "comment" && (
                <i className="fas fa-comment-alt"></i>
              )}

              {notification.type === "reaction" && (
                <img
                  src={
                    reactions.find(
                      (item) => item.type === notification.reaction.type
                    ).icon
                  }
                />
              )}
            </div>
          </div>
          <div className={styles["notification__info"]}>
            <p className={styles["notification__title"]}>
              <strong>{notification.user.fullName}</strong>
              {notification.title.includes("và") && " và "}
              {notification.title.includes("và") && (
                <>
                  <strong>
                    {notification.title.slice(
                      notification.title.indexOf("và") + 2,
                      notification.title.indexOf("khác") + 4
                    )}
                  </strong>
                  {notification.title.slice(
                    notification.title.indexOf("khác") + 4
                  )}
                </>
              )}
              {!notification.title.includes("và") &&
                notification.title.slice(notification.user.fullName.length)}
            </p>
            <span className={styles["notification__time"]}>{durationText}</span>
          </div>
        </div>
      </Link>
    )
  );
}
