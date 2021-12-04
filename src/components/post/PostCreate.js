import React, { useEffect, useState } from "react";

import Card from "../ui/Card";
import Tag from "../ui/Tag";
import PostCreateModal from "./PostCreateModal";

import styles from "./PostCreate.module.css";
import Overlay from "../overlay/Overlay";

export default function PostCreate(props) {
  const [isDisplayModal, setIsDisplayModal] = useState(false);

  const displayModal = () => setIsDisplayModal(true);
  const hideModal = () => setIsDisplayModal(false);

  useEffect(() => {
    if (isDisplayModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = null;
    }
  }, [isDisplayModal]);

  return (
    <>
      {isDisplayModal && (
        <PostCreateModal onChange={props.onChange} onClose={hideModal} />
      )}
      {isDisplayModal && <Overlay onClick={hideModal} />}
      <Card className={styles.card}>
        <h6 className={styles.heading}>
          <i className="far fa-edit"></i>
          Create Post
        </h6>
        <div>
          <div className={styles.input} onClick={displayModal}>
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
    </>
  );
}
