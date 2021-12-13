import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userCtx";

import Card from "../ui/Card";

import styles from "./Setting.module.css";

export default function Setting() {
  const context = useContext(userContext);
  const cardRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();
  const [isDisplaySettingCard, setIsDisplaySettingCard] = useState(false);

  const toggleDisplaySettingCard = () =>
    setIsDisplaySettingCard((isDisplay) => !isDisplay);
  const hideSettingCard = () => setIsDisplaySettingCard(false);
  const handleClickOutsidCard = (e) => {
    if (
      cardRef.current &&
      !cardRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      hideSettingCard();
    }
  };

  // logout handler
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/auth/login", { replace: true });
    hideSettingCard();
  };

  // click outside handler

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsidCard);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidCard);
    };
  });

  return (
    <>
      <li onClick={toggleDisplaySettingCard} ref={buttonRef}>
        <i className="fas fa-caret-down"></i>
      </li>
      {isDisplaySettingCard && (
        <Card ref={cardRef} className={styles.card}>
          <Link onClick={hideSettingCard} to={"/profile/"}>
            <div className={styles.user}>
              <div className={styles["user__img"]}>
                <img src={context.avatar} alt={context.fullName} />
              </div>
              <div>
                <h6 className={styles["user__name"]}>{context.fullName}</h6>
                <span className={styles["user__actions"]}>
                  Xem trang cá nhân của bạn
                </span>
              </div>
            </div>
          </Link>
          <div className={styles.divider}></div>
          <div onClick={logoutHandler} className={styles["setting__action"]}>
            <div className={styles["setting__action-icon"]}>
              <i className="fas fa-sign-out-alt"></i>
            </div>
            Đăng xuất
          </div>
        </Card>
      )}
    </>
  );
}
