import React from "react";

import PostCreate from "../components/post/PostCreate";
import Post from "../components/post/Post";
import ProfileFriends from "../components/profile/ProfileFriends";
import ProfileIntroduction from "../components/profile/ProfileIntroduction";

import styles from "./ProfilePageHome.module.css";

export default function ProfilePageHome() {
  return (
    <div className={styles["container"]}>
      <aside>
        <ProfileIntroduction />
        <ProfileFriends />
      </aside>

      <div>
        <PostCreate />

        <div>
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}
