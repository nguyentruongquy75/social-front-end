import React from "react";

import Card from "../ui/Card";

import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  return (
    <Card className={styles.card}>
      <div className={styles["profile__img"]}>
        <img
          src="https://scontent.fsgn10-1.fna.fbcdn.net/v/t1.6435-9/70513320_885720811802987_8708970306393341952_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=7J16PulCIskAX-NF796&_nc_oc=AQn7SxBbRE7eyWXAsTaSIZ48sUL_md7ASSsrvXM5a5ul1xC2SLhGOuQ92ZnNZOPeEqtqUR-4Xd-D4cGbBKOLWbmf&_nc_ht=scontent.fsgn10-1.fna&oh=42849fdd2693290201e7571a9a840d1d&oe=61CB9962"
          alt="Avatar"
        />
      </div>

      <div className={styles["profile__info"]}>
        <h6>Nguyen Truong Quy</h6>
      </div>
    </Card>
  );
}
