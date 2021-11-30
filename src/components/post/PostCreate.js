import React from "react";

import Card from "../ui/Card";
import Tag from "../ui/Tag";

import styles from "./PostCreate.module.css";

export default function PostCreate() {
  return (
    <Card className={styles.card}>
      <h6 className={styles.heading}>
        <i className="far fa-edit"></i>
        Create Post
      </h6>
      <div>
        <div className={styles.input}>
          <textarea placeholder="What's on your mind, Quy?" />
        </div>
      </div>
      <div className={styles["post__bottom"]}>
        <Tag className={`${styles.tag} ${styles["tag--blue"]}`}>
          <div className={styles["tag__icon"]}>
            <i className="far fa-images"></i>
          </div>
          <span>Gallery</span>
        </Tag>

        <Tag className={`${styles.tag} ${styles["tag--pink"]}`}>
          <div className={styles["tag__icon"]}>
            <i className="fas fa-user-tag"></i>
          </div>
          <span>Tag Friends</span>
        </Tag>

        <Tag className={`${styles.tag} ${styles["tag--yellow"]}`}>
          <div className={styles["tag__icon"]}>
            <i className="fas fa-user-tag"></i>
          </div>
          <span>Felling</span>
        </Tag>
      </div>
    </Card>
  );
}
