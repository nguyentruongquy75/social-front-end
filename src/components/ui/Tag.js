import React from "react";

import styles from "./Tag.module.css";

export default function Tag(props) {
  return (
    <div className={`${styles.tag} ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
}
