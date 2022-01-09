import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./ProfileTab.module.css";

export default function ProfileTab() {
  const location = useLocation();

  const path = location.pathname.slice(0, location.pathname.lastIndexOf("/"));

  return (
    <div className={styles["profile-tab"]}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={path + "/"}
          >
            Bài viết
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={`${path}/introduction`}
          >
            Giới thiệu
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={`${path}/friend`}
          >
            Bạn bè
          </NavLink>
        </li>

        {/* <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={`${path}/photo`}
          >
            Ảnh
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}
