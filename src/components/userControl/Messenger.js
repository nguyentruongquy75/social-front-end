import React, { useContext, useEffect, useRef, useState } from "react";
import { API_chat, API_user } from "../../config";
import ChatRoom from "../chat/ChatRoom";
import MessengerModal from "./MessengerModal";

import userContext from "../../context/userCtx";
import socket from "../../socket";
export default function Messenger(props) {
  const context = useContext(userContext);
  const modalRef = useRef();
  const buttonRef = useRef();
  const [isDisplayMessengerModal, setIsDisplayMessengerModal] = useState(false);
  const [chatRoomModal, setChatRoomModal] = useState({
    isDisplay: false,
    chatRoom: null,
  });
  const [chatRooms, setChatRooms] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dataSocket, setDataSocket] = useState(null);

  // messenger modal
  const toggleDisplayMessengerModal = () =>
    setIsDisplayMessengerModal((isDisplay) => !isDisplay);
  const hideMessengerModal = () => setIsDisplayMessengerModal(false);
  const handleClickout = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      window.innerWidth >= 500 && hideMessengerModal();
    }
  };

  // chat room modal
  const displayChatRoomModal = () =>
    setChatRoomModal((prev) => ({
      ...prev,
      isDisplay: true,
    }));
  const hideChatRoomModal = () =>
    setChatRoomModal((prev) => ({
      ...prev,
      isDisplay: false,
    }));

  const setDataChatRoomModal = (data) =>
    setChatRoomModal((prev) => ({
      chatRoom: data,
      isDisplay: true,
    }));

  // fetch api
  useEffect(async () => {
    try {
      const reponse = await fetch(`${API_user}/${context.id}/chatrooms`);

      const chatRooms = await reponse.json();

      setChatRooms(chatRooms);
    } catch (error) {
      console.log(error);
    } finally {
      setDataSocket(null);
    }
  }, [dataSocket]);

  socket.on(`${context.id}chatrooms`, (data) => {
    setDataSocket(data);
  });

  // get unread count
  useEffect(() => {
    const unreadCount = chatRooms.filter((item) => !item.isRead).length;
    setUnreadCount(unreadCount);
  }, [chatRooms]);

  // click out
  useEffect(() => {
    document.addEventListener("mousedown", handleClickout);

    return () => document.removeEventListener("mousedown", handleClickout);
  });

  return (
    <>
      <li
        className={isDisplayMessengerModal && props.active}
        ref={buttonRef}
        onClick={toggleDisplayMessengerModal}
      >
        <i className="fab fa-facebook-messenger"></i>
        {unreadCount > 0 && <div className={props.count}>{unreadCount}</div>}
      </li>
      {isDisplayMessengerModal && (
        <MessengerModal
          setDataChatRoomModal={setDataChatRoomModal}
          setUnreadCount={setUnreadCount}
          hideMessengerModal={hideMessengerModal}
          chatRooms={chatRooms}
          ref={modalRef}
        />
      )}
      {chatRoomModal.isDisplay && (
        <ChatRoom
          chatRoom={chatRoomModal.chatRoom}
          onClose={hideChatRoomModal}
        />
      )}
    </>
  );
}
