import React from "react";

import Notifications from "./Notifications";
import Messenger from "./Messenger";

import styles from "./UserControl.module.css";

export default function UserControl() {
  return (
    <ul className={styles["user-control"]}>
      <Messenger active={styles.active} count={styles.count} />
      <Notifications active={styles.active} count={styles.count} />
    </ul>
  );
}
