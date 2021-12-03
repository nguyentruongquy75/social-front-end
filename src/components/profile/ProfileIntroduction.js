import React from "react";

import Card from "../ui/Card";

import styles from "./ProfileIntroduction.module.css";

export default function ProfileIntroduction() {
  return (
    <Card className={styles["card"]}>
      <h4 className={styles.heading}>Giới thiệu</h4>

      <ul className={styles["introduction__list"]}>
        <li>
          <div className={styles["introduction__icon"]}>
            <i className="fas fa-home"></i>
          </div>
          Sống tại Hồ Chí Minh
        </li>
        <li>
          <div className={styles["introduction__icon"]}>
            <i className="fas fa-map-marker-alt"></i>
          </div>
          Đến từ Bến Tre
        </li>

        <li>
          <div className={styles["introduction__icon"]}>
            <i className="fas fa-heart"></i>
          </div>
          Độc thân
        </li>

        <li>
          <div className={styles["introduction__icon"]}>
            <i className="fas fa-clock"></i>
          </div>
          Tham gia vào Tháng 11, 2021
        </li>
      </ul>
    </Card>
  );
}
