import React from "react";
import Card from "../ui/Card";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <Card className={styles.card}>
      <ul className={styles.nav}>
        <li>
          <a href="#" className={styles.active}>
            <i className="fas fa-home"></i>
            Home
          </a>
        </li>

        <li>
          <a href="#">
            <i className="far fa-newspaper"></i>
            News Feed
          </a>
        </li>

        <li>
          <a href="#">
            <i className="far fa-address-book"></i>
            People
          </a>
        </li>

        <li>
          <a href="#">
            <i className="far fa-image"></i>
            Photos
          </a>
        </li>

        <li>
          <a href="#">
            <i className="far fa-user"></i>
            Pofile
          </a>
        </li>
      </ul>
    </Card>
  );
}
