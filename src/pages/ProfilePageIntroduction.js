import React from "react";
import ProfileIntroduction from "../components/profile/ProfileIntroduction";

import styles from "./ProfilePageIntroduction.module.css";

export default function ProfilePageIntroduction(props) {
  return (
    <div className={styles.container}>
      <ProfileIntroduction user={props.user} />
    </div>
  );
}
