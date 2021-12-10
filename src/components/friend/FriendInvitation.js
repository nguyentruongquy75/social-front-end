import React, { useContext, useState, useEffect } from "react";
import userContext from "../../context/userCtx";
import Button from "../ui/Button";
import Card from "../ui/Card";

import styles from "./FriendInvitation.module.css";

import { API_user } from "../../config";

export default function FriendInvitation(props) {
  const context = useContext(userContext);
  const invitation = props.invitation;
  const fullName = `${invitation.sender.lastName} ${invitation.sender.firstName}`;
  const [status, setStatus] = useState("pending");

  const accept = () => setStatus("accepted");
  const reject = () => setStatus("rejected");

  useEffect(async () => {
    if (status !== "pending") {
      const response = await fetch(`${API_user}/${context.id}/invite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: invitation._id,
          status,
        }),
      });
      const updatedInvitation = await response.json();
    }
  }, [status]);

  return (
    <Card className={styles.card}>
      <div className={styles["invitation__image"]}>
        <img src={invitation.sender.avatar} alt={fullName} />
      </div>

      <div className={styles["invitation__info"]}>
        <h6 className={styles.name}>{fullName}</h6>

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
