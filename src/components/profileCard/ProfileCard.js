import React, { useContext } from "react";
import userContext from "../../context/userCtx";

import Card from "../ui/Card";

import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  const context = useContext(userContext);

  return (
    <Card className={styles.card}>
      <div className={styles["profile__img"]}>
        <img src={context.avatar} alt="Avatar" />
      </div>

      <div className={styles["profile__info"]}>
        <h6>{context.fullName}</h6>
      </div>
    </Card>
  );
}
