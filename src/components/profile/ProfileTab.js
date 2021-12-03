import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./ProfileTab.module.css";

export default function ProfileTab() {
  return (
    <div className={styles["profile-tab"]}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/profile/"
          >
            Bài viết
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/profile/introduction"
          >
            Giới thiệu
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/profile/friend"
          >
            Bạn bè
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/profile/photo"
          >
            Ảnh
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
