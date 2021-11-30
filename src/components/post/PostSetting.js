import React from "react";

import styles from "./PostSetting.module.css";

export default function PostSetting() {
  return (
    <div>
      <div className={styles["setting__icon"]}>
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </div>
  );
}
