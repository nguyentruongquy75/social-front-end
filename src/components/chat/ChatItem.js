import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import userContext from "../../context/userCtx";

import { addPopupChat } from "../../redux/updateSlice";

import styles from "./ChatItem.module.css";

export default function ChatItem(props) {
  const context = useContext(userContext);
  const dispatch = useDispatch();
  const room = props.room;
  const friend =
    room.type === "single"
      ? room.participants.find((user) => user._id !== context.id)
      : null;

  const roomInfo = {
    image: room.type === "single" ? friend.avatar : room.image,
    name: room.type === "single" ? friend.fullName : room.name,
    _id: room._id,
    type: room.type,
  };

  // duration
  const duration =
    room.lastMessage && Date.now() - new Date(room.lastMessage.createAt);
  const convertDurationToString = (duration) => {
    const seconds = duration / 1000;
    const minutes = seconds / 60;

    if (seconds < 60) {
      return "Vừa xong";
    }

    if (minutes < 60) {
      return `${Math.floor(minutes)} phút`;
    }
    const hours = minutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)} giờ`;
    }

    const days = hours / 24;

    return `${Math.floor(days)} ngày`;
  };

  // click on chat item
  const handleClickOnChatItem = (e) => {
    dispatch(addPopupChat(roomInfo));
    props.hideMessengerModal();
  };

  const getStatus = () => {
    if (room.lastMessage) {
      if (room.lastMessage.user === context.id) {
        return room.lastMessage.isSeen ? "seen" : "unseen";
      } else {
        return room.lastMessage.isSeen ? "" : "unread";
      }
    }

    return "unread";
  };

  const status = getStatus();
  return (
    <div
      className={`${styles["chat__item"]} ${
        status ? styles["chat__item--" + status] : ""
      }`}
      onClick={handleClickOnChatItem}
      data-id={room._id}
    >
      <div className={styles["chat__image"]}>
        <img src={roomInfo.image} alt="" />
      </div>
      <div className={styles["chat__info"]}>
        <div className={styles["chat__info-container"]}>
          <span className={styles["chat__name"]}>{roomInfo.name}</span>
          {room.lastMessage && (
            <div className={styles["chat__message"]}>
              <span className={styles["chat__message-content"]}>
                {`${status === "seen" || status === "unseen" ? "Bạn: " : ""}${
                  room.lastMessage && room.lastMessage.message
                }`}
              </span>
              <span>{convertDurationToString(duration)}</span>
            </div>
          )}
        </div>
        <div className={styles["chat__icon"]}>
          <div className={styles.check}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className={styles.circle}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
