import React from "react";
import Card from "../ui/Card";
import SmallButton from "../ui/SmallButton";

import styles from "./FriendInvitationCard.module.css";

export default function FriendInvitationCard() {
  return (
    <Card className={styles["card"]}>
      <div className={styles["invitation__info"]}>
        <div className={styles["invitation__img"]}>
          <img
            src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Image"
          />
        </div>
        <span>Truong Quy wants to add you to friends</span>
      </div>
      <div className={styles["invitation__actions"]}>
        <SmallButton className={styles["button--blue"]}>Accept</SmallButton>
        <SmallButton>Decline</SmallButton>
      </div>
    </Card>
  );
}
