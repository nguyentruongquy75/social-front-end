import React, { useContext, useEffect, useState } from "react";
import { API_user } from "../../config";
import userContext from "../../context/userCtx";
import Card from "../ui/Card";
import SmallButton from "../ui/SmallButton";

import styles from "./FriendInvitationCard.module.css";

export default function FriendInvitationCard(props) {
  const invitation = props.invitation;
  const fullName = `${invitation.sender.lastName} ${invitation.sender.firstName}`;
  const context = useContext(userContext);
  const [status, setStatus] = useState(invitation.status);

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

  const accept = () => setStatus("accepted");
  const reject = () => setStatus("rejected");

  return (
    <Card className={styles["card"]}>
      <div className={styles["invitation__info"]}>
        <div className={styles["invitation__img"]}>
          <img
            src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Image"
          />
        </div>
        <span>{fullName} wants to add you to friends</span>
      </div>
      {status === "pending" && (
        <div className={styles["invitation__actions"]}>
          <SmallButton onClick={accept} className={styles["button--blue"]}>
            Accept
          </SmallButton>
          <SmallButton onClick={reject}>Decline</SmallButton>
        </div>
      )}

      {status !== "pending" && (
        <div className={`${styles["invitation__status"]} ${styles[status]}`}>
          <SmallButton>
            {status === "accepted" ? "You are friends" : "Rejected"}
          </SmallButton>
        </div>
      )}
    </Card>
  );
}
