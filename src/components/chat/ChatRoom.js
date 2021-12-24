import React, { useContext, useEffect, useRef, useState } from "react";
import { API_chat } from "../../config";
import userContext from "../../context/userCtx";

import socket from "../../socket";

import Card from "../ui/Card";
import Spinner from "../spinner/Spinner";

import styles from "./ChatRoom.module.css";
import Message from "./Message";
import ChatRoomActions from "./ChatRoomActions";

const limit = 20;
let listScrollHeight = null;

export default function ChatRoom(props) {
  const context = useContext(userContext);
  const inputRef = useRef();
  const listRef = useRef();
  const room = props.chatRoom;
  const [messages, setMessages] = useState([]);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [dataSocket, setDataSocket] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 20,
    hasPagination: false,
    fetchStatus: "initial",
    isFetchPagination: false,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      setIsFormSubmit(true);
    }
  };

  const handleScrollToTop = (e) => {
    if (e.target.scrollTop < 1 && pagination.hasPagination) {
      listScrollHeight = listRef.current.scrollHeight;
      setPagination((prev) => ({
        ...prev,
        limit: prev.limit + limit,
      }));
    }
  };

  const setStatusPagination = (status) =>
    setPagination((prev) => ({
      ...prev,
      fetchStatus: status,
    }));

  const setIsFetchDataPagination = (isFetch) =>
    setPagination((prev) => ({
      ...prev,
      isFetchPagination: isFetch,
    }));

  // scroll to top
  useEffect(() => {
    if (pagination.hasPagination && listRef.current) {
      listRef.current.addEventListener("scroll", handleScrollToTop);
      return () =>
        listRef.current &&
        listRef.current.removeEventListener("scroll", handleScrollToTop);
    }
  });

  // hand position when load data pagination
  useEffect(() => {
    if (pagination.isFetchPagination) {
      listRef.current.scrollTop =
        listRef.current.scrollHeight - listScrollHeight;
      setIsFetchDataPagination(false);
    } else {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // scroll to bottom when submit

  // submit form
  useEffect(async () => {
    if (isFormSubmit) {
      try {
        setMessages((prev) => [
          ...prev,
          {
            _id: "id",
            message: inputRef.current.value,
            isSeen: false,
            user: {
              _id: context.id,
              fullName: context.fullName,
              avatar: context.avatar,
            },
          },
        ]);
        const response = await fetch(`${API_chat}/${room._id}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: context.id,
            message: inputRef.current.value,
          }),
        });

        const newMessage = await response.json();
      } catch (error) {
        console.log(error);
      } finally {
        inputRef.current.value = "";
        listRef.current.scrollTop = listRef.current.scrollHeight;
        setIsFormSubmit(false);
      }
    }
  }, [isFormSubmit]);

  // data socket
  socket.on(room._id + "chat", (data) => {
    setDataSocket(data);
  });

  // fetch api
  useEffect(async () => {
    if (dataSocket || pagination.limit) {
      try {
        pagination.hasPagination && setStatusPagination("loading");
        const response = await fetch(
          `${API_chat}/${room._id}/messages?limit=${pagination.limit}`
        );
        const messages = await response.json();
        setMessages(messages);
        setPagination((prev) => ({
          ...prev,
          hasPagination: messages.length >= pagination.limit,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        dataSocket && setDataSocket(null);
        pagination.hasPagination && setStatusPagination("finished");
        pagination.hasPagination && setIsFetchDataPagination(true);
      }
    }
  }, [dataSocket, pagination.limit]);

  return (
    <>
      <Card className={styles["card"]}>
        <div className={styles["card__top"]}>
          <div className={styles["chat__info"]}>
            <div className={styles["chat__image"]}>
              <img src={room.image} alt={room.name} />
            </div>
            <div className={styles["chat__name"]}>
              <span>{room.name}</span>
            </div>
          </div>
          <ChatRoomActions room={room} onClose={props.onClose} />
        </div>

        <div ref={listRef} className={styles["message__list"]}>
          {pagination.fetchStatus === "loading" && (
            <div className={styles.loading}>
              <Spinner />
            </div>
          )}

          {messages.map((message) => (
            <Message key={message._id} message={message} chatRoomInfo={room} />
          ))}
        </div>

        <div className={styles["card__bottom"]}>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="chat__photo" className={styles["photo__button"]}>
              <i className="fas fa-image"></i>
              <input
                type="file"
                id="chat__photo"
                hidden
                accept="video/*, image/*"
              />
            </label>
            <div className={styles["card__input"]}>
              <input ref={inputRef} type="text" placeholder="Aa" />
            </div>
            <button type="submit" className={styles["send__button"]}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </Card>
    </>
  );
}
