import React from "react";

import styles from "./SexSelection.module.css";

export default function SexSelection(props) {
  const changeHandler = (e) => {
    props.setValue && props.setValue(e.target.value);
  };

  return (
    <div className={styles["sex-selection__container"]}>
      <label className={styles.label}>Giới tính</label>

      <div className={styles["sex-selection"]}>
        <div>
          <label htmlFor="male">Nam</label>
          <input
            onChange={changeHandler}
            type="radio"
            value="male"
            name="sex"
            id="male"
          />
        </div>
        <div>
          <label htmlFor="female">Nữ</label>
          <input
            onChange={changeHandler}
            type="radio"
            value="female"
            name="sex"
            id="female"
          />
        </div>
        <div>
          <label htmlFor="other">Khác</label>
          <input
            onChange={changeHandler}
            type="radio"
            value="other"
            name="sex"
            id="other"
          />
        </div>
      </div>
    </div>
  );
}
