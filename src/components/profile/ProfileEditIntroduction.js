import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";

import styles from "./ProfileEditIntroduction.module.css";

import { API_user } from "../../config";
import userContext from "../../context/userCtx";

export default function ProfileEditIntroduction(props) {
  const context = useContext(userContext);
  const statusRef = useRef();
  const addressRef = useRef();
  const provinceRef = useRef();
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const submitFormHandler = (e) => {
    e.preventDefault();
    setIsFormSubmit(true);
  };

  useEffect(async () => {
    const updateUser = async () => {
      const formData = new FormData();
      formData.append("_id", context.id);
      formData.append("address", addressRef.current.value);
      formData.append("province", provinceRef.current.value);
      formData.append("status", statusRef.current.value);

      try {
        const response = await fetch(API_user, {
          method: "PATCH",
          body: formData,
        });

        const updatedUser = await response.json();

        return updatedUser;
      } catch (error) {
        console.log(error);
      }
    };
    if (isFormSubmit) {
      const isChange =
        addressRef.current.value !== (props.information.address || "") ||
        provinceRef.current.value !== (props.information.province || "") ||
        statusRef.current.value !== props.information.status;
      if (isChange) {
        const updatedUser = await updateUser();
        props.setUser(updatedUser);
      }
      props.onClose();

      setIsFormSubmit(false);
    }
  }, [isFormSubmit]);

  useEffect(() => {
    const options = document.querySelectorAll("select[name=status] option");
    if (props.information.status) {
      options.forEach((option) => {
        option.value === props.information.status && (option.selected = true);
      });
    } else {
      options[0].selected = true;
    }
  }, [props.information]);
  return (
    <Card className={styles["modal"]}>
      <div className={styles["modal__top"]}>
        <h4 className={styles["modal__heading"]}>Chỉnh sửa chi tiết</h4>
        <div onClick={props.onClose} className={styles["modal__close"]}>
          <i className="fas fa-times"></i>
        </div>
      </div>

      <form onSubmit={submitFormHandler}>
        <div className={styles["modal__body"]}>
          <section className={styles.section}>
            <div className={styles["section__top"]}>
              <h4 className={styles["section__heading"]}>
                Tỉnh/Thành phố hiện tại
              </h4>
            </div>
            <div className={`${styles["section__body"]} }`}>
              <input
                ref={addressRef}
                defaultValue={props.information.address}
                type="text"
              />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles["section__top"]}>
              <h4 className={styles["section__heading"]}>Quê quán</h4>
            </div>
            <div className={`${styles["section__body"]} }`}>
              <input
                ref={provinceRef}
                defaultValue={props.information.province}
                type="text"
              />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles["section__top"]}>
              <h4 className={styles["section__heading"]}>Mối quan hệ</h4>
            </div>
            <div className={`${styles["section__body"]} }`}>
              <select ref={statusRef} name="status">
                <option>Trạng thái</option>
                <option value="Single">Độc thân</option>
                <option value="In Relationship">Hẹn hò</option>
                <option value="Engaged">Đã đính hôn</option>
                <option value="Married">Đã kết hôn</option>
                <option value="Registered cohabitation">
                  Chung sống có đăng ký
                </option>
                <option value="Cohabitation">Chung sống</option>
                <option value="Find out">Tìm hiểu</option>
              </select>
            </div>
          </section>
        </div>

        <div className={styles["modal__bottom"]}>
          <Button
            type="button"
            onClick={props.onClose}
            className={`${styles.button}`}
          >
            Huỷ
          </Button>
          <Button
            type="Submit"
            className={`${styles.button} ${styles["button--blue"]}`}
          >
            Lưu
          </Button>
        </div>
      </form>
    </Card>
  );
}
