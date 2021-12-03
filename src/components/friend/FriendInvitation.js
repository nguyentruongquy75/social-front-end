import React, { useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";

import styles from "./FriendInvitation.module.css";

export default function FriendInvitation() {
  const [status, setStatus] = useState("pending");

  const accept = () => setStatus("accepted");
  const reject = () => setStatus("rejected");

  return (
    <Card className={styles.card}>
      <div className={styles["invitation__image"]}>
        <img
          src="https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-1/s240x240/259438991_921344362109226_181562073755684793_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ZB5AzG_hcmAAX8loLYW&_nc_ht=scontent.fsgn7-1.fna&oh=5bf753f874ae9e3c6b1441f1375283bd&oe=61ABC9DC"
          alt=""
        />
      </div>

      <div className={styles["invitation__info"]}>
        <h6 className={styles.name}>Duy Bang</h6>

        {status === "pending" && (
          <>
            <Button
              onClick={accept}
              className={`${styles.button} ${styles["button--blue"]}`}
            >
              Xác nhận
            </Button>
            <Button onClick={reject} className={styles.button}>
              Xoá
            </Button>
          </>
        )}

        {status === "accepted" && (
          <Button className={`${styles.button} ${styles["button--accepted"]} `}>
            Đã chấp nhận lời mời
          </Button>
        )}

        {status === "rejected" && (
          <Button className={`${styles.button} ${styles["button--rejected"]}`}>
            Đã xoá yêu cầu
          </Button>
        )}
      </div>
    </Card>
  );
}
