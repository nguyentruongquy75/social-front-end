import React from "react";
import SmallFriendCard from "../friend/SmallFriendCard";
import Card from "../ui/Card";

import styles from "./ProfileFriends.module.css";

export default function ProfileFriends() {
  return (
    <Card className={styles.card}>
      <div className={styles["card__top"]}>
        <h4 className={styles.heading}>Bạn bè</h4>
        <a href="#">Xem tất cả bạn bè</a>
      </div>

      <div className={styles["friend__list"]}>
        <SmallFriendCard />
        <SmallFriendCard />
        <SmallFriendCard />
        <SmallFriendCard />
        <SmallFriendCard />
      </div>
    </Card>
  );
}
