import React from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

import styles from "./BigFriendCard.module.css";

export default function BigFriendCard(props) {
  const friend = props.friend;

  return (
    <Card className={styles["card"]}>
      <div className={styles.user}>
        <div className={styles["user__image"]}>
          <Link to={`/${friend._id}/profile/`}>
            <img src={friend.avatar} alt={friend.fullName} />
          </Link>
        </div>

        <div className={styles["user__info"]}>
          <h4>
            <Link to={`/${friend._id}/profile/`}>{friend.fullName}</Link>
          </h4>
        </div>
      </div>

      <div className={styles.expand}>
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </Card>
  );
}
