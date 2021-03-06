import React from "react";

import styles from "./SmallButton.module.css";

export default function SmallButton(props) {
  return (
    <button
      className={`${styles.button} ${props.className ? props.className : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
