import React from "react";
import { useDispatch } from "react-redux";

import { addPopupChat, removePopupChat } from "../../redux/updateSlice";

import styles from "./ChatRoomActions.module.css";
export default function ChatRoomActions(props) {
  const room = props.room;
  const dispatch = useDispatch();

  const closeChatRoom = () => {
    dispatch(
      removePopupChat({
        _id: room._id,
        type: room.type,
      })
    );
  };

  const callVoice = () => {
    dispatch(
      addPopupChat({
        ...room,
        type: "voice",
        _id: room._id,
        status: "call",
      })
    );
  };

  const callVideo = () => {
    dispatch(
      addPopupChat({
        ...room,
        type: "video",
        _id: room._id,
        status: "call",
      })
    );
  };

  return (
    <div className={styles["card__actions"]}>
      <div onClick={callVideo}>
        <i className="fas fa-video"></i>
      </div>
      <div onClick={callVoice}>
        <i className="fas fa-phone"></i>
      </div>
      {/* <div>
        <i className="fas fa-minus"></i>
      </div> */}
      <div onClick={closeChatRoom}>
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
}
