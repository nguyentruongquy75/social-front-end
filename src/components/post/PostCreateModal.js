import React, { useContext, useRef, useState, useEffect } from "react";
import Card from "../ui/Card";

import GridImage from "react-fb-image-grid";

import userContext from "../../context/userCtx";

import styles from "./PostCreateModal.module.css";
import { API_post } from "../../config";

export default function PostCreateModal(props) {
  const context = useContext(userContext);

  const [status, setStatus] = useState("initial");
  const [isAddPhoto, setIsAddPhoto] = useState(false);
  const [imagePreview, setImagePreview] = useState(props.post?.image || []);
  const [title, setTitle] = useState(props.post?.title || "");

  const addPhoto = () => setIsAddPhoto(true);
  const removePhoto = () => setIsAddPhoto(false);

  const updateNewsfeed = () => props.onChange();

  const textRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", textRef.current.value);
    formData.append("user", context.id);
    imagePreview.forEach((image) => formData.append("image", image));
    props.type === "edit" && formData.append("_id", props.post._id);

    try {
      setStatus("loading");
      const response = await fetch(API_post, {
        method: props.type === "edit" ? "PATCH" : "POST",
        body: formData,
      });
      const post = await response.json();

      props.onClose();
      updateNewsfeed();
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("finished");
    }
  };

  const fileUpload = (e) => {
    setImagePreview((prev) => [...prev, ...Object.values(e.target.files)]);
  };

  const removeFileUpload = () => {
    setImagePreview(null);
  };

  // title change
  const titleChangeHandler = (e) => setTitle(e.target.value);

  // focus when display
  useEffect(() => {
    textRef.current.focus();
    textRef.current.value.length > 0 &&
      textRef.current.setSelectionRange(
        textRef.current.value.length,
        textRef.current.value.length
      );
  }, []);

  // disable button
  const buttonRef = useRef();
  useEffect(() => {
    props.type === "edit" &&
      (buttonRef.current.disabled =
        title === props.post.title && imagePreview === props.post.image);

    props.type !== "edit" &&
      (buttonRef.current.disabled = title === "" && imagePreview.length === 0);
  }, [title, imagePreview]);

  return (
    <Card className={styles.modal}>
      {status === "loading" && (
        <div className={styles["loading"]}>
          Đang {props.type === "edit" ? "lưu" : "đăng"} ...
        </div>
      )}
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
              <img src={context.avatar} alt={context.fullName} />
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
              value={title}
              onChange={titleChangeHandler}
            />

            {imagePreview && (
              <div className={styles["image-preview"]}>
                <div className={styles["close"]} onClick={removeFileUpload}>
                  <i className="fas fa-times"></i>
                </div>
                <GridImage
                  images={imagePreview.map((item) => {
                    if (typeof item !== "string") {
                      return URL.createObjectURL(item);
                    }
                    return item;
                  })}
                  countFrom={3}
                  renderOverlay={() => ""}
                  overlayBackgroundColor={"#0000"}
                />
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
                  multiple
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
            <button disabled ref={buttonRef} type="submit">
              {props.type === "edit" ? "Lưu" : "Đăng"}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
