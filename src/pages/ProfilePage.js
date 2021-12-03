import React from "react";
import { Route, Routes } from "react-router-dom";

import ProfileTab from "../components/profile/ProfileTab";
import Button from "../components/ui/Button";

import styles from "./ProfilePage.module.css";
import ProfilePageFriend from "./ProfilePageFriend";
import ProfilePageHome from "./ProfilePageHome";
import ProfilePageIntroduction from "./ProfilePageIntroduction";
import ProfilePagePhoto from "./ProfilePagePhoto";

export default function ProfilePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["profile__top"]}>
        <div className={styles["cover-image"]}>
          <img
            src="https://images.unsplash.com/photo-1638237076831-a7f6c9dd58a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>

        <div className={styles.user}>
          <div className={styles["user__avatar"]}>
            <img
              src="https://images.unsplash.com/photo-1618874026570-e3c2fb1bd44a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGdpcmwlMjBhbG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="Avatar"
            />
          </div>

          <div className={styles["user__name"]}>
            <h4>Do Nguyen</h4>
          </div>

          <div className={styles["user__action"]}>
            <Button>
              <i className="fas fa-user-check"></i>
              Bạn bè
            </Button>

            <Button className={styles["button--blue"]}>
              <i className="fab fa-facebook-messenger"></i>
              Nhắn tin
            </Button>
          </div>
        </div>

        <ProfileTab />
      </div>

      <div className={styles["profile__body"]}>
        <Routes>
          <Route path="/" element={<ProfilePageHome />} />
          <Route path="/introduction" element={<ProfilePageIntroduction />} />
          <Route path="/friend" element={<ProfilePageFriend />} />
          <Route path="/photo" element={<ProfilePagePhoto />} />
        </Routes>
      </div>
    </div>
  );
}
