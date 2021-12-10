import React, { useContext, useEffect, useState } from "react";
import { API_user } from "../../config";
import userContext from "../../context/userCtx";
import FriendInvitationCard from "./FriendInvitationCard";

import styles from "./Request.module.css";

export default function Request() {
  const context = useContext(userContext);
  const [invitations, setInvitations] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${API_user}/${context.id}/invite`);
      const invitations = await response.json();
      setInvitations(invitations);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section>
      <div className={styles["heading"]}>
        <h6>Request</h6>
        <div className={styles["request-count"]}>{invitations.length}</div>
      </div>

      <div>
        {invitations.slice(0, 2).map((invitation) => (
          <FriendInvitationCard key={invitation._id} invitation={invitation} />
        ))}
      </div>
    </section>
  );
}
