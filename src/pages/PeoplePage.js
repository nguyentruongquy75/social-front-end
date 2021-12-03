import React from "react";
import FriendInvitation from "../components/friend/FriendInvitation";

import styles from "./PeoplePage.module.css";

export default function PeoplePage() {
  return (
    <div className={styles["wrapper"]}>
      <aside className={styles.sidebar}>
        <h3 className={styles.heading}>Bạn bè</h3>
        <ul>
          <li>
            <a href="#">
              <div className={styles.icon}>
                <i className="fas fa-user-plus"></i>
              </div>
              Lời mời kết bạn
            </a>
          </li>

          <li>
            <a href="#">
              <div className={styles.icon}>
                <i class="fas fa-user-friends"></i>
              </div>
              Tất cả bạn bè
            </a>
          </li>
        </ul>
      </aside>

      <div>
        <h3 className={styles["invitation__heading"]}>Lời mời kết bạn</h3>
        <div className={styles["invitation__list"]}>
          <FriendInvitation />
        </div>
      </div>
    </div>
  );
}
