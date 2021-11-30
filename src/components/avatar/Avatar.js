import React from "react";

import styles from "./Avatar.module.css";

export default function Avatar() {
  return (
    <div className={styles.avatar}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/OOjs_UI_icon_userAvatar-constructive.svg/120px-OOjs_UI_icon_userAvatar-constructive.svg.png"
        alt="Avatar"
      />
    </div>
  );
}
