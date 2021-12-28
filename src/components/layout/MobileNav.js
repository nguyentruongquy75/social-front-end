import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API_user } from "../../config";
import userContext from "../../context/userCtx";
import Messenger from "../userControl/Messenger";

import socket from "../../socket";

import styles from "./MobileNav.module.css";

export default function MobileNav() {
  const context = useContext(userContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifiacations, setUnreadNoitifications] = useState([]);
  const [dataSocket, setDataSocket] = useState(null);

  const readNotifications = () => setUnreadNoitifications([]);

  useEffect(async () => {
    try {
      const respose = await fetch(`${API_user}/${context.id}/notifications`);
      const notifiactions = await respose.json();

      const unreadNotifiacations = notifications
        .filter((notification) => !notification.isRead)
        .map((notification) => notification._id);

      setUnreadNoitifications(unreadNotifiacations);

      setNotifications(notifiactions);
    } catch (error) {
      console.log(error);
    } finally {
      setDataSocket(null);
    }
  }, [dataSocket]);

  socket.on(`${context.id}notification`, (data) => {
    setDataSocket(data);
  });

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
          <Messenger />
        </li>

        <li onClick={readNotifications}>
          <NavLink
            to="/notifications"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <div className={styles["notification__icon"]}>
              <i className="fas fa-bell"></i>
              {unreadNotifiacations.length > 0 && (
                <div className={styles["notification__count"]}>
                  {unreadNotifiacations.length}
                </div>
              )}
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
