import React from "react";
import Card from "../ui/Card";

import styles from "./BigFriendCard.module.css";

export default function BigFriendCard(props) {
  const friend = props.friend;

  const fullName = `${friend.lastName} ${friend.firstName}`;

  return (
    <Card className={styles["card"]}>
      <div className={styles.user}>
        <div className={styles["user__image"]}>
          <img src={friend.avatar} alt={fullName} />
        </div>

        <div className={styles["user__info"]}>
          <h4>{fullName}</h4>
        </div>
      </div>

      <div className={styles.expand}>
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </Card>
  );
}
