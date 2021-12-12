import React, { useContext, useEffect, useRef, useState } from "react";
import { API_post } from "../../config";
import userContext from "../../context/userCtx";
import Card from "../ui/Card";

import styles from "./PostSetting.module.css";

export default function PostSetting(props) {
  const user = props.user;
  const context = useContext(userContext);
  const modalRef = useRef();

  const [isDisplaySettingModal, setIsDisplaySettingModal] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const toggleDisplaySettingModal = () =>
    setIsDisplaySettingModal((isDisplay) => !isDisplay);
  const hideSettingModal = () => setIsDisplaySettingModal(false);

  const handleClickOutModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      hideSettingModal();
    }
  };

  const removePost = () => setIsRemove(true);

  // click out modal
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutModal);

    return () => document.removeEventListener("mousedown", handleClickOutModal);
  }, [isDisplaySettingModal]);

  // remove post
  useEffect(() => {
    const removePost = async () => {
      try {
        const response = await fetch(`${API_post}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: props.postId,
          }),
        });
      } catch (error) {
        console.log(error);
      } finally {
        props.onChange();
      }
    };
    if (isRemove) {
      removePost();
    }
  }, [isRemove]);

  return (
    <div className={styles["setting"]}>
      <div
        onClick={toggleDisplaySettingModal}
        className={styles["setting__icon"]}
      >
        <i className="fas fa-ellipsis-h"></i>
      </div>
      {isDisplaySettingModal && (
        <Card ref={modalRef} className={styles["setting__modal"]}>
          <ul>
            <li>
              <i className="fas fa-link"></i>
              Sao chép liên kết
            </li>

            {context.id === user._id && (
              <li onClick={removePost}>
                <i className="far fa-trash-alt"></i>
                Xoá bài viết
              </li>
            )}
          </ul>
        </Card>
      )}
    </div>
  );
}
