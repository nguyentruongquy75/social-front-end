import React, { useContext, useEffect, useState } from "react";
import { API_chat } from "../../config";
import userContext from "../../context/userCtx";
import styles from "./MessengerResultItem.module.css";
export default function MessengerResultItem(props) {
  const context = useContext(userContext);
  const result = props.result;
  const [isClickOnResult, setIsClickOnResult] = useState(false);
  const participants = result.account ? [context.id, result._id] : [];

  // const roomInfo = {
  //   image: room.type === "single" ? friend.avatar : room.image,
  //   name: room.type === "single" ? friend.fullName : room.name,
  //   _id: room._id,
  // };

  const clickResultHandler = () => {
    setIsClickOnResult(true);
  };

  useEffect(async () => {
    if (isClickOnResult) {
      props.hideMessengerModal();
      try {
        const response = await fetch(API_chat, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: result.account ? "single" : "group",
            participants,
          }),
        });
        const chatRoom = await response.json();
        const friend =
          chatRoom.type === "single"
            ? chatRoom.participants.find((user) => user._id !== context.id)
            : null;
        props.setDataChatRoomModal({
          image: chatRoom.type === "single" ? friend.avatar : chatRoom.image,
          name: chatRoom.type === "single" ? friend.fullName : chatRoom.name,
          _id: chatRoom._id,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickOnResult(false);
      }
    }
  }, [isClickOnResult]);

  return (
    <div className={styles["result"]} onClick={clickResultHandler}>
      <div className={styles["result__image"]}>
        <img src={result.avatar} alt="" />
      </div>
      <div>
        <span className={styles["result__name"]}>{result.fullName}</span>
        {/* <span className={styles["result__participants"]}>
          Trần Tú Nam Kha, Phúc Lê, Yến Thịnh and 62 others
        </span> */}
      </div>
    </div>
  );
}
