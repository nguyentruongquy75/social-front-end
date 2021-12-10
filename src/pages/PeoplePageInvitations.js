import React, { useContext, useEffect, useState } from "react";

import FriendInvitation from "../components/friend/FriendInvitation";
import Spinner from "../components/spinner/Spinner";
import { API_user } from "../config";
import userContext from "../context/userCtx";

import styles from "./PeoplePageInvitations.module.css";
export default function PeoplePageInvitations() {
  const context = useContext(userContext);
  const [invitations, setInvitations] = useState([]);
  const [status, setStatus] = useState("initial");

  useEffect(async () => {
    try {
      setStatus("loading");
      const response = await fetch(`${API_user}/${context.id}/invite`);
      const invitations = await response.json();

      setInvitations(invitations);
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("finished");
    }
  }, [context]);

  console.log(invitations);

  return (
    <div className={styles.container}>
      <h3 className={styles["invitation__heading"]}>Lời mời kết bạn</h3>
      <div className={styles["invitation__list"]}>
        {status === "loading" && (
          <div className={styles.loading}>
            <Spinner className={styles.spinner} />
          </div>
        )}

        {status === "finished" &&
          invitations.map((invitation) => (
            <FriendInvitation invitation={invitation} key={invitation._id} />
          ))}
      </div>
    </div>
  );
}
