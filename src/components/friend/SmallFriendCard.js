import React from "react";

import styles from "./SmallFriendCard.module.css";

export default function SmallFriendCard() {
  return (
    <div>
      <div className={styles["friend__avatar"]}>
        <img
          src="https://images.unsplash.com/photo-1638280987803-f533dba99cab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Avatar"
        />
      </div>
      <h5 className={styles["friend__name"]}>Hoàng Phú</h5>
    </div>
  );
}
