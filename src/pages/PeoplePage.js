import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import styles from "./PeoplePage.module.css";
import PeoplePageFriends from "./PeoplePageFriends";
import PeoplePageInvitations from "./PeoplePageInvitations";

export default function PeoplePage() {
  return (
    <div className={styles["wrapper"]}>
      <aside className={styles.sidebar}>
        <h3 className={styles.heading}>Bạn bè</h3>
        <ul>
          <li>
            <NavLink
              to="/people/invitations"
              className={({ isActive }) => (isActive ? styles["active"] : "")}
            >
              <div className={styles.icon}>
                <i className="fas fa-user-plus"></i>
              </div>
              Lời mời kết bạn
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/people/friends"
              className={({ isActive }) => (isActive ? styles["active"] : "")}
            >
              <div className={styles.icon}>
                <i class="fas fa-user-friends"></i>
              </div>
              Tất cả bạn bè
            </NavLink>
          </li>
        </ul>
      </aside>
      <Routes>
        <Route path="/invitations" element={<PeoplePageInvitations />} />
        <Route path="/friends" element={<PeoplePageFriends />} />
      </Routes>
    </div>
  );
}
