import React from "react";
import LogoImg from "../../assets/img/logo.svg";

import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <object type="image/svg+xml" data={LogoImg}>
        Your browser does not support SVG
      </object>
    </div>
  );
}
