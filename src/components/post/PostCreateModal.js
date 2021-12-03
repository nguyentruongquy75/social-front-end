import React, { useContext, useRef, useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";

import userContext from "../../context/userCtx";

import styles from "./PostCreateModal.module.css";
import { API_post } from "../../config";

export default function PostCreateModal(props) {
  const context = useContext(userContext);

  const [isAddPhoto, setIsAddPhoto] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const addPhoto = () => setIsAddPhoto(true);
  const removePhoto = () => setIsAddPhoto(false);

  const textRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", textRef.current.value);
    formData.append("user", context.id);
    formData.append("image", imagePreview[0]);

    try {
      const response = await fetch(API_post, {
        method: "POST",
        body: formData,
      });
      const post = await response.json();

      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  const fileUpload = (e) => {
    setImagePreview(e.target.files);
  };

  const removeFileUpload = () => {
    setImagePreview(null);
  };

  return (
    <Card className={styles.modal}>
      <form onSubmit={submitHandler}>
        <div className={styles["modal__top"]}>
          <h3>Tạo bài viết</h3>

          <div className={styles["modal__close"]} onClick={props.onClose}>
            <i className="fas fa-times"></i>
          </div>
        </div>

        <div className={styles["modal__body"]}>
          <div className={styles.user}>
            <div className={styles["user__avatar"]}>
              <img
                src="https://images.unsplash.com/photo-1638280987803-f533dba99cab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="Avatar"
              />
            </div>

            <div className={styles["user__info"]}>
              <h4>{context.fullName}</h4>
            </div>
          </div>

          <div className={styles.input}>
            <textarea
              ref={textRef}
              placeholder={`Bạn đang nghĩ gì ?`}
              name="content"
            />

            {imagePreview && (
              <div className={styles["image-preview"]}>
                <div className={styles["close"]} onClick={removeFileUpload}>
                  <i className="fas fa-times"></i>
                </div>
                <img src={URL.createObjectURL(imagePreview[0])} />
              </div>
            )}

            {isAddPhoto && (
              <div className={styles["input__file"]}>
                <div className={styles.close} onClick={removePhoto}>
                  <i className="fas fa-times"></i>
                </div>
                <label htmlFor="fileUpload">
                  <div className={styles.icon}>
                    <i className="fas fa-photo-video"></i>
                  </div>
                  Thêm ảnh
                </label>
                <input
                  onChange={fileUpload}
                  accept="image/*"
                  type="file"
                  id="fileUpload"
                />
              </div>
            )}
          </div>

          <div className={styles.additional}>
            <h6>Thêm vào bài viết</h6>

            <div className={styles["additional__list"]}>
              <div
                onClick={addPhoto}
                className={`${styles["additional__photo"]} ${styles["additional__item"]}`}
              >
                <i className="far fa-images"></i>
              </div>

              <div
                className={`${styles["additional__tag"]} ${styles["additional__item"]}`}
              >
                <i className="fas fa-user-tag"></i>
              </div>

              <div
                className={`${styles["additional__felling"]} ${styles["additional__item"]}`}
              >
                <i className="far fa-smile"></i>
              </div>
            </div>
          </div>

          <div className={styles["button"]}>
            <button type="submit">Đăng</button>
          </div>
        </div>
      </form>
    </Card>
  );
}