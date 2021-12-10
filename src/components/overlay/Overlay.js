import React from "react";

import styles from "./Overlay.module.css";

export default function Overlay(props) {
  return (
    <div
      onClick={props.onClick}
      className={`${styles.overlay} ${props.className ? props.className : ""}`}
    ></div>
  );
}
