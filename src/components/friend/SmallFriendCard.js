import React from "react";

import styles from "./SmallFriendCard.module.css";

export default function SmallFriendCard(props) {
  const friend = props.friend;
  const fullName = `${friend.lastName} ${friend.firstName}`;
  return (
    <div>
      <div className={styles["friend__avatar"]}>
        <img src={friend.avatar} alt={fullName} />
      </div>
      <h5 className={styles["friend__name"]}>{fullName}</h5>
    </div>
  );
}
