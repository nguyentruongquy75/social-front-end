import React, { useContext } from "react";
import userContext from "../../context/userCtx";

import styles from "./Message.module.css";

export default function Message(props) {
  const context = useContext(userContext);
  const chatRoomInfo = props.chatRoomInfo;
  const message = props.message;
  const isMe = message.user._id === context.id;

  return (
    <>
      <div
        className={`${styles["message"]} ${isMe ? styles["message--me"] : ""} ${
          props.isSeen ? "" : styles["message--unseen"]
        } `}
        data-id={message._id}
      >
        <div
          className={`${styles["message__img"]} ${
            props.isDisplayAvatar ? styles["display"] : ""
          }`}
        >
          <img src={message.user.avatar} alt={message.user.fullName} />
        </div>
        <div className={styles["message__content-container"]}>
          {chatRoomInfo.type === "group" && (
            <span className={styles["message__auth"]}>
              {message.user.fullName}
            </span>
          )}
          <div className={styles["message__content"]}>{message.message}</div>
        </div>
        <div className={styles.space}>
          <div className={styles.unseen}>
            <i className="fas fa-check-circle"></i>
          </div>
        </div>
      </div>
    </>
  );
}
