import React from "react";
import FriendInvitationCard from "./FriendInvitationCard";

import styles from "./Request.module.css";

export default function Request() {
  return (
    <section>
      <div className={styles["heading"]}>
        <h6>Request</h6>
        <div className={styles["request-count"]}>2</div>
      </div>

      <div>
        <FriendInvitationCard />
        <FriendInvitationCard />
      </div>
    </section>
  );
}
