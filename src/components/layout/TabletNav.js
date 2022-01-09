import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import userContext from "../../context/userCtx";

import styles from "./TabletNav.module.css";
export default function TabletNav() {
  const context = useContext(userContext);
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="fas fa-home"></i>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/people/invitations"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="fas fa-user-friends"></i>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="far fa-user"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
