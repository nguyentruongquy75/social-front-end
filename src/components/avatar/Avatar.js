import React, { useContext } from "react";
import userContext from "../../context/userCtx";

import styles from "./Avatar.module.css";

export default function Avatar() {
  const context = useContext(userContext);
  return (
    <div className={styles.avatar}>
      <img src={context.avatar} alt={context.fullName} />
    </div>
  );
}
