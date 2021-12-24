import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import userContext from "../../context/userCtx";
import socket from "../../socket";
import ChatRoom from "../chat/ChatRoom";
import MessengerVoice from "../chat/MessengerVoice";

import { addPopupChat } from "../../redux/updateSlice";

import styles from "./Main.module.css";
import MessengerVideo from "../chat/MessengerVideo";

export default function Main(props) {
  const popupChat = useSelector((state) => state.update.popupChat);
  const context = useContext(userContext);
  const dispatch = useDispatch();

  socket.on(`${context.id}callvoiceinvitation`, (room) => {
    dispatch(
      addPopupChat({
        ...room.chatRoom,
        type: "voice",
        status: "receive",
        user: room.user,
      })
    );
  });

  socket.on(`${context.id}callvideoinvitation`, (room) => {
    dispatch(
      addPopupChat({
        ...room.chatRoom,
        type: "video",
        status: "receive",
        user: room.user,
      })
    );
  });

  return (
    <main className={styles.main}>
      {props.children}
      <div className={styles["popupchat"]}>
        {popupChat.map((chat) => {
          if (chat.type === "voice") {
            return <MessengerVoice room={chat} />;
          } else if (chat.type === "video") {
            return <MessengerVideo room={chat} />;
          } else {
            return <ChatRoom chatRoom={chat} />;
          }
        })}
      </div>
    </main>
  );
}
