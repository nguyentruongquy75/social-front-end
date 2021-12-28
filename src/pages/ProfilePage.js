import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useParams } from "react-router-dom";
import Overlay from "../components/overlay/Overlay";
import ProfileEdit from "../components/profile/ProfileEdit";

import ProfileTab from "../components/profile/ProfileTab";
import Button from "../components/ui/Button";
import { API_user, API_chat } from "../config";
import userContext from "../context/userCtx";
import { addPopupChat } from "../redux/updateSlice";

import Responsive from "../components/responsive/Responsive";
import ProfilePageFriend from "./ProfilePageFriend";
import ProfilePageHome from "./ProfilePageHome";
import ProfilePageIntroduction from "./ProfilePageIntroduction";
import ProfilePagePhoto from "./ProfilePagePhoto";

import styles from "./ProfilePage.module.css";
import Card from "../components/ui/Card";

let isInitial = true;
export default function ProfilePage(props) {
  const params = useParams();
  const context = useContext(userContext);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const isFriend = user && user.friends.find((item) => item._id === context.id);

  const [invitation, setInvitation] = useState(null);
  const [isSendedInvitation, setIsSendedInvitation] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isDisplayFriendAction, setIsDisplayFriendAction] = useState(false);
  const [isDeleteFriend, setIsDeleteFriend] = useState(false);

  // Profile Edit
  const [isDisplayProfileEdit, setIsDisplayProfileEdit] = useState(false);
  const displayProfileEdit = () => setIsDisplayProfileEdit(true);
  const hideProfileEdit = () => setIsDisplayProfileEdit(false);

  const toggleSendInvitation = () => {
    if (isInitial) {
      isInitial = false;
    }
    setIsSendedInvitation((isSend) => !isSend);
  };

  const chat = () => setIsChat(true);

  const toggleDisplayFriendAction = () =>
    setIsDisplayFriendAction((isDisplay) => !isDisplay);

  const deleteFriend = () => setIsDeleteFriend(true);

  // fetch user
  useEffect(async () => {
    try {
      const response = await fetch(
        `${API_user}/${params.userId || props.userId}`
      );
      const user = await response.json();
      const initialInvitation =
        user &&
        user.friendInvitations.find((item) => item.sender === context.id);
      setUser(user);
      setInvitation(initialInvitation);
      setIsSendedInvitation(Boolean(initialInvitation));
    } catch (error) {
      console.log(error);
    }
  }, [params]);

  // send friend invitation
  useEffect(async () => {
    if (!isInitial) {
      if (isSendedInvitation) {
        const response = await fetch(`${API_user}/${user._id}/invite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: context.id,
          }),
        });
        const newInvitation = await response.json();

        setInvitation(newInvitation);
      } else if (invitation && !isSendedInvitation) {
        const response = await fetch(`${API_user}/${user._id}/invite`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: invitation._id,
          }),
        });

        setInvitation(null);
      }
    }
  }, [isSendedInvitation]);

  //css for blank cover image
  const coverRef = useRef();
  useEffect(() => {
    if (user && !user.cover) {
      coverRef.current.style.backgroundColor = `var(--color-gray-light)`;
    }
  }, [user]);

  // get chat room
  useEffect(async () => {
    if (isChat) {
      try {
        const response = await fetch(`${API_chat}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "single",
            participants: [context.id, user._id],
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
        setIsChat(false);
      }
    }
  }, [isChat]);

  // delete friend
  useEffect(async () => {
    if (isDeleteFriend) {
      const response = await fetch(`${API_user}/${context.id}/friends`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
        }),
      });
    }
  }, [isDeleteFriend]);

  // css for display profile edit
  const profileEditRef = useRef();
  useEffect(() => {
    if (isDisplayProfileEdit) {
      document.documentElement.scrollTo(0, 0);
      Object.assign(document.querySelector("main").style, {
        height: profileEditRef.current.clientHeight + 100 + "px",
        overflow: "hidden",
      });
    } else {
      Object.assign(document.querySelector("main").style, {
        height: null,
        overflow: null,
      });
    }
  }, [isDisplayProfileEdit]);

  return (
    <>
      {user && (
        <>
          <div className={styles["profile__top"]}>
            <div className={styles.wrapper}>
              <div ref={coverRef} className={styles["cover-image"]}>
                {user.cover && <img src={user.cover} alt={user.fullName} />}
              </div>

              <div className={styles.user}>
                <div className={styles["user__avatar"]}>
                  <img src={user.avatar} alt={user.fullName} />
                </div>

                <div className={styles["user__name"]}>
                  <h4>{user.fullName}</h4>
                </div>

                {context.id !== user._id && (
                  <div className={styles["user__action"]}>
                    {(!isFriend || isDeleteFriend) && (
                      <Button
                        onClick={toggleSendInvitation}
                        className={
                          isSendedInvitation ? styles["button--blue"] : ""
                        }
                      >
                        <i className="fas fa-user-plus"></i>
                        {isSendedInvitation ? "Huỷ lời mời" : "Thêm bạn bè"}
                      </Button>
                    )}
                    {isFriend && !isDeleteFriend && (
                      <Button
                        onClick={toggleDisplayFriendAction}
                        className={styles["friend__action"]}
                      >
                        <i className="fas fa-user-check"></i>
                        Bạn bè
                        {isDisplayFriendAction && (
                          <Card className={styles["friend__action-modal"]}>
                            <ul>
                              <li onClick={deleteFriend}>
                                <i className="fas fa-user-times"></i>
                                Huỷ kết bạn
                              </li>
                            </ul>
                          </Card>
                        )}
                      </Button>
                    )}

                    <Button onClick={chat} className={styles["button--blue"]}>
                      <i className="fab fa-facebook-messenger"></i>
                      Nhắn tin
                    </Button>
                  </div>
                )}
                {context.id === user._id && (
                  <div className={styles["user__action"]}>
                    <Button onClick={displayProfileEdit}>
                      <i className="fas fa-pen"></i>
                      Chỉnh sửa trang cá nhân
                    </Button>
                  </div>
                )}
              </div>

              <Responsive minWidth={500}>
                <ProfileTab />
              </Responsive>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles["profile__body"]}>
              <Routes>
                <Route path="/" element={<ProfilePageHome user={user} />} />
                <Route
                  path="/introduction"
                  element={<ProfilePageIntroduction user={user} />}
                />
                <Route
                  path="/friend"
                  element={<ProfilePageFriend friends={user.friends} />}
                />
                <Route path="/photo" element={<ProfilePagePhoto />} />
              </Routes>
            </div>
          </div>
        </>
      )}
      {isDisplayProfileEdit && (
        <>
          <ProfileEdit
            ref={profileEditRef}
            onClose={hideProfileEdit}
            user={user}
            setUser={setUser}
          />
          <Overlay onClick={hideProfileEdit} />
        </>
      )}
    </>
  );
}
