import React from "react";

import styles from "./ContactItem.module.css";

export default function ContactItem() {
  return (
    <div className={styles["contact-item"]}>
      <div className={styles["contact-item__info"]}>
        <div className={styles["contact-item__img"]}>
          <img
            src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Test"
          />
        </div>

        <h6>Nguyen Van Test</h6>
      </div>
      <div>
        <div className={styles["contact-item__icon"]}>
          <i className="fas fa-ellipsis-h"></i>
        </div>

        {/* <div className={styles["contact-item__count"]}>10</div> */}
      </div>
    </div>
  );
}
