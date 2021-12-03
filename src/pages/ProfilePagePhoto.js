import React from "react";
import Card from "../components/ui/Card";

import styles from "./ProfilePagePhoto.module.css";

export default function ProfilePagePhoto() {
  return (
    <Card className={styles.card}>
      <h4 className={styles.heading}>Ảnh</h4>

      <div className={styles["photo__list"]}>
        <div className={styles["photo__item"]}>
          <img
            src="https://images.unsplash.com/photo-1638204958085-e244354dab91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>

        <div className={styles["photo__item"]}>
          <img
            src="https://images.unsplash.com/photo-1638204958085-e244354dab91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>

        <div className={styles["photo__item"]}>
          <img
            src="https://images.unsplash.com/photo-1638204958085-e244354dab91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
      </div>
    </Card>
  );
}
