import React, { useContext, useEffect, useState } from "react";
import { API_user } from "../../config";
import userContext from "../../context/userCtx";
import FriendInvitationCard from "./FriendInvitationCard";

import socket from "../../socket";
import styles from "./Request.module.css";

export default function Request() {
  const context = useContext(userContext);
  const [invitations, setInvitations] = useState([]);
  const [hasChange, setHasChange] = useState(false);
  const [dataSocket, setDataSocket] = useState(null);

  const changeData = () => setHasChange((hasChange) => !hasChange);

  // data socket
  socket.on(context.id + "invitation", (data) => {
    setDataSocket(data);
  });

  useEffect(() => {
    if (dataSocket) {
      changeData();
    }
  }, [dataSocket]);

  useEffect(async () => {
    try {
      const response = await fetch(`${API_user}/${context.id}/invite`);
      const invitations = await response.json();
      setInvitations(invitations);
    } catch (error) {
      console.log(error);
    } finally {
      setDataSocket(null);
    }
  }, [hasChange]);

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
