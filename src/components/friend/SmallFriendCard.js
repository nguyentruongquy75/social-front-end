import React from "react";

import { Link } from "react-router-dom";

import styles from "./SmallFriendCard.module.css";

export default function SmallFriendCard(props) {
  const friend = props.friend;
  const fullName = `${friend.lastName} ${friend.firstName}`;
  return (
    <Link to={`/${friend._id}/profile`}>
      <div className={styles["friend__avatar"]}>
        <img src={friend.avatar} alt={fullName} />
      </div>
      <h5 className={styles["friend__name"]}>{fullName}</h5>
    </Link>
  );
}
