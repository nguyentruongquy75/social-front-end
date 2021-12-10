import React from "react";
import { Link } from "react-router-dom";
import SmallFriendCard from "../friend/SmallFriendCard";
import Card from "../ui/Card";

import styles from "./ProfileFriends.module.css";

export default function ProfileFriends(props) {
  const friends = props.friends;
  return (
    <Card className={styles.card}>
      <div className={styles["card__top"]}>
        <h4 className={styles.heading}>Bạn bè</h4>
        <Link to="/people/friends">Xem tất cả bạn bè</Link>
      </div>

      <div className={styles["friend__list"]}>
        {friends.map((friend) => (
          <SmallFriendCard key={friend._id} friend={friend} />
        ))}
      </div>
    </Card>
  );
}
