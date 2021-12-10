import React from "react";
import { NavLink } from "react-router-dom";

import Card from "../ui/Card";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <Card className={styles.card}>
      <ul className={styles.nav}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="far fa-newspaper"></i>
            News Feed
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/people/invitations"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="far fa-address-book"></i>
            People
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile/photo"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="far fa-image"></i>
            Photos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="far fa-user"></i>
            Pofile
          </NavLink>
        </li>
      </ul>
    </Card>
  );
}
