import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../../context/userCtx";

import Card from "../ui/Card";

import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  const context = useContext(userContext);

  return (
    <Link to="/profile/" className={styles["card__link"]}>
      <Card className={styles.card}>
        <div className={styles["profile__img"]}>
          <img src={context.avatar} alt={context.fullName} />
        </div>

        <div className={styles["profile__info"]}>
          <h6>{context.fullName}</h6>
        </div>
      </Card>
    </Link>
  );
}
