import React from "react";

import styles from "./Spinner.module.css";

export default function Spinner(props) {
  return (
    <div
      className={`${styles.spinner} ${props.className ? props.className : ""}`}
    ></div>
  );
}
