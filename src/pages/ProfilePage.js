import React, { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import Overlay from "../components/overlay/Overlay";
import ProfileEdit from "../components/profile/ProfileEdit";

import ProfileTab from "../components/profile/ProfileTab";
import Button from "../components/ui/Button";
import { API_user } from "../config";
import userContext from "../context/userCtx";

import styles from "./ProfilePage.module.css";
import ProfilePageFriend from "./ProfilePageFriend";
import ProfilePageHome from "./ProfilePageHome";
import ProfilePageIntroduction from "./ProfilePageIntroduction";
import ProfilePagePhoto from "./ProfilePagePhoto";

let isInitial = true;
export default function ProfilePage(props) {
  const params = useParams();
  const context = useContext(userContext);
  const [user, setUser] = useState(null);
  const isFriend = user && user.friends.find((item) => item._id === context.id);

  const [invitation, setInvitation] = useState(null);
  const [isSendedInvitation, setIsSendedInvitation] = useState(false);

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
  }, []);

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
                    {!isFriend && (
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
                    {isFriend && (
                      <Button>
                        <i className="fas fa-user-check"></i>
                        Bạn bè
                      </Button>
                    )}

                    <Button className={styles["button--blue"]}>
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

              <ProfileTab />
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
