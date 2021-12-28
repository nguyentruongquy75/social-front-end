import React from "react";
import BigFriendCard from "../components/friend/BigFriendCard";
import Card from "../components/ui/Card";

import styles from "./ProfilePageFriend.module.css";

export default function ProfilePageFriend(props) {
  return (
    <div className={styles["container"]}>
      <Card className={styles["card"]}>
        <div className={styles["card__top"]}>
          <h4 className={styles.heading}>Bạn bè</h4>

          <div className={styles.search}>
            <div className={styles["search__icon"]}>
              <i className="fas fa-search"></i>
            </div>
            <input type="text" placeholder="Tìm kiếm" />
          </div>
        </div>

        <div className={styles["friend__list"]}>
          {props.friends.map((friend) => (
            <BigFriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      </Card>
    </div>
  );
}
