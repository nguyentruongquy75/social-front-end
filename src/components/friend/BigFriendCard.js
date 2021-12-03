import React from "react";
import Card from "../ui/Card";

import styles from "./BigFriendCard.module.css";

export default function BigFriendCard() {
  return (
    <Card className={styles["card"]}>
      <div className={styles.user}>
        <div className={styles["user__image"]}>
          <img
            src="https://images.unsplash.com/photo-1638204957608-6990e96ad161?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>

        <div className={styles["user__info"]}>
          <h4>Đỗ Quốc Kiệt</h4>
        </div>
      </div>

      <div className={styles.expand}>
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </Card>
  );
}
