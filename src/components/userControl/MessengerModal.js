import React, { useContext, useEffect, useState } from "react";
import ChatItem from "../chat/ChatItem";
import MessengerResultItem from "../chat/MessengerResultItem";

import Card from "../ui/Card";

import styles from "./MessengerModal.module.css";

import { API_chat, API_user } from "../../config";
import userContext from "../../context/userCtx";

const MessengerModal = React.forwardRef((props, ref) => {
  const context = useContext(userContext);
  const chatRooms = props.chatRooms;
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFetchResult, setIsFetchResult] = useState(false);

  const inputFocusHandler = () => {
    setIsSearch(true);
  };

  const goback = () => {
    setIsSearch(false);
    setSearchResult([]);
  };

  const changeSearchValue = (e) => setSearchValue(e.target.value);

  useEffect(() => {
    if (searchValue) {
      const id = setTimeout(() => {
        setIsFetchResult(true);
      }, 500);

      return () => clearTimeout(id);
    }
  }, [searchValue]);

  useEffect(async () => {
    if (isFetchResult) {
      try {
        const response = await fetch(
          `${API_chat}?q=${searchValue}&userId=${context.id}`
        );
        const results = await response.json();

        setSearchResult(results);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetchResult(false);
      }
    }
  }, [isFetchResult]);

  // mobile
  useEffect(() => {
    if (window.innerWidth <= 499) {
      let firstTouchY = 0;
      const handleTouchStart = (e) => (firstTouchY = e.touches[0].pageY);
      const handleTouchMove = (e) => {
        if (firstTouchY < e.touches[0].pageY) {
          ref.current.style.transform = `translateY(${
            e.touches[0].pageY - firstTouchY
          }px)`;
        }
      };
      const handleTouchEnd = (e) => {
        if (firstTouchY < e.changedTouches[0].pageY) {
          if (e.changedTouches[0].pageY - firstTouchY > 200) {
            ref.current.style.transform = `translateY(100%)`;
            setTimeout(() => {
              props.hideMessengerModal();
            }, 500);
          } else {
            ref.current.style.transform = `translateY(0)`;
          }
        }
      };

      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  // read chat room
  useEffect(async () => {
    try {
      const response = await fetch(`${API_user}/${context.id}/chatrooms`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      props.setUnreadCount(0);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Card ref={ref} className={styles["card"]}>
      <h2>Chat</h2>
      <div className={styles["search__top"]}>
        {isSearch && (
          <div onClick={goback} className={styles.back}>
            <i className="fas fa-arrow-left"></i>
          </div>
        )}
        <div className={styles["search"]}>
          <input
            onFocus={inputFocusHandler}
            id="search"
            type="text"
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={changeSearchValue}
          />
          <label className={styles["search__label"]} htmlFor="search">
            <i className="fas fa-search"></i>
          </label>
        </div>
      </div>

      {!isSearch && (
        <div className={styles["chat__list"]}>
          {chatRooms.map((room) => (
            <ChatItem
              hideMessengerModal={props.hideMessengerModal}
              room={room}
              key={room._id}
            />
          ))}
        </div>
      )}
      {isSearch && (
        <div className={styles["result__list"]}>
          {searchResult.map((result) => (
            <MessengerResultItem
              hideMessengerModal={props.hideMessengerModal}
              key={result._id}
              result={result}
            />
          ))}
        </div>
      )}
    </Card>
  );
});

export default MessengerModal;
