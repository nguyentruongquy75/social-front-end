import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_chat } from "../../config";
import userContext from "../../context/userCtx";
import { addPopupChat } from "../../redux/updateSlice";

import styles from "./ContactItem.module.css";

export default function ContactItem(props) {
  const context = useContext(userContext);
  const dispatch = useDispatch();
  const contact = props.contact;
  const [isClicked, setIsClicked] = useState(false);

  const clickContactHandler = () => {
    setIsClicked(true);
  };

  // get chat room
  useEffect(async () => {
    if (isClicked) {
      try {
        const response = await fetch(`${API_chat}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "single",
            participants: [context.id, contact._id],
          }),
        });
        const chatRoom = await response.json();

        const friend =
          chatRoom.type === "single"
            ? chatRoom.participants.find((user) => user._id !== context.id)
            : null;

        const roomInfo = {
          image: chatRoom.type === "single" ? friend.avatar : chatRoom.image,
          name: chatRoom.type === "single" ? friend.fullName : chatRoom.name,
          _id: chatRoom._id,
          type: chatRoom.type,
        };

        dispatch(addPopupChat(roomInfo));
      } catch (error) {
        console.log(error);
      } finally {
        setIsClicked(false);
      }
    }
  }, [isClicked]);

  return (
    <div className={styles["contact-item"]} onClick={clickContactHandler}>
      <div className={styles["contact-item__info"]}>
        <div className={styles["contact-item__img"]}>
          <img src={contact.avatar} alt={contact.fullName} />
        </div>

        <h6>{contact.fullName}</h6>
      </div>
      <div>
        <div className={styles["contact-item__icon"]}></div>

        {/* <div className={styles["contact-item__count"]}>10</div> */}
      </div>
    </div>
  );
}
