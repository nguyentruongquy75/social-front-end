import React from "react";

import Card from "../ui/Card";

import styles from "./ProfileIntroduction.module.css";

const status = {
  Single: "Độc thân",
  Married: "Đã kết hôn",
  "In Relationship": "Hẹn hò",
  Engaged: "Đã đính hôn",
  "Registered cohabitation": "Chung sống có đăng ký",
  Cohabitation: "Chung sống",
  "Find out": "Tìm hiểu",
};

export default function ProfileIntroduction(props) {
  const user = props.user;
  const createdAt = new Date(user.createdAt);
  return (
    <Card className={styles["card"]}>
      <h4 className={styles.heading}>Giới thiệu</h4>

      <ul className={styles["introduction__list"]}>
        {user.cover && (
          <li className={styles["bio"]}>
            <div>{user.bio}</div>
          </li>
        )}

        {user.address && (
          <li>
            <div className={styles["introduction__icon"]}>
              <i className="fas fa-home"></i>
            </div>
            Sống tại {user.address}
          </li>
        )}
        {user.province && (
          <li>
            <div className={styles["introduction__icon"]}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            Đến từ {user.province}
          </li>
        )}
        {user.status && (
          <li>
            <div className={styles["introduction__icon"]}>
              <i className="fas fa-heart"></i>
            </div>
            {status[user.status]}
          </li>
        )}

        <li>
          <div className={styles["introduction__icon"]}>
            <i className="fas fa-clock"></i>
          </div>
          Tham gia vào Tháng {createdAt.getMonth() + 1},{" "}
          {createdAt.getFullYear()}
        </li>
      </ul>
    </Card>
  );
}
