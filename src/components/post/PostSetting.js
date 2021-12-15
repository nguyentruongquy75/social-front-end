import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { API_post } from "../../config";
import userContext from "../../context/userCtx";
import { changeNewsfeed } from "../../redux/updateSlice";

import Card from "../ui/Card";
import PostCreateModal from "../post/PostCreateModal";
import Overlay from "../overlay/Overlay";

import styles from "./PostSetting.module.css";

export default function PostSetting(props) {
  const user = props.user;
  const context = useContext(userContext);
  const modalRef = useRef();

  const [isDisplaySettingModal, setIsDisplaySettingModal] = useState(false);
  const [isDisplayCoppyPopup, setIsDisplayCoppyPopup] = useState(false);
  const [isCopyLinkPost, setIsCoppyLinkPost] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleDisplaySettingModal = () =>
    setIsDisplaySettingModal((isDisplay) => !isDisplay);
  const hideSettingModal = () => setIsDisplaySettingModal(false);

  const handleClickOutModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      hideSettingModal();
    }
  };

  const copyLinkPost = () => setIsCoppyLinkPost(true);

  const displayCoppyPopup = () => setIsDisplayCoppyPopup(true);
  const hideCoppyPopup = () => setIsDisplayCoppyPopup(false);

  const removePost = () => setIsRemove(true);

  const editPost = () => {
    setIsEdit(true);
    setIsDisplaySettingModal(false);
  };
  const removeEditPost = () => setIsEdit(false);

  // click out modal
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutModal);

    return () => document.removeEventListener("mousedown", handleClickOutModal);
  }, [isDisplaySettingModal]);

  // remove post
  const dispatch = useDispatch();
  const updateNewsfeed = () => dispatch(changeNewsfeed());
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
        updateNewsfeed();
      }
    };
    if (isRemove) {
      removePost();
    }
  }, [isRemove]);

  // coppy link post

  useEffect(() => {
    let timeoutId = null;
    if (isCopyLinkPost) {
      navigator.clipboard.writeText(
        `${window.location.origin}/posts/${props.postId}`
      );
      displayCoppyPopup();
      setIsCoppyLinkPost(false);
      hideSettingModal();

      timeoutId = setTimeout(() => {
        hideCoppyPopup();
      }, 3000);
    }
  }, [isCopyLinkPost]);

  // disable scroll
  useEffect(() => {
    if (isEdit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = null;
    }
  }, [isEdit]);

  return (
    <>
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
              <li onClick={copyLinkPost}>
                <i className="fas fa-link"></i>
                Sao chép liên kết
              </li>

              {context.id === user._id && (
                <>
                  <li onClick={editPost}>
                    <i className="fas fa-pencil-alt"></i>
                    Chỉnh sửa bài viết
                  </li>
                  <li onClick={removePost}>
                    <i className="far fa-trash-alt"></i>
                    Xoá bài viết
                  </li>
                </>
              )}
            </ul>
          </Card>
        )}
      </div>
      {isDisplayCoppyPopup && (
        <Card className={styles["coppy__popup"]}>
          <div className={styles["coppy__message"]}>
            <i className="fas fa-check-circle"></i>
            Đã sao chép liên kết
          </div>
          <div
            onClick={hideCoppyPopup}
            className={styles["coppy__popup-close"]}
          >
            <i className="fas fa-times"></i>
          </div>
        </Card>
      )}

      {isEdit && (
        <PostCreateModal
          type="edit"
          post={props.post}
          onClose={removeEditPost}
        />
      )}
      {isEdit && (
        <Overlay onClick={removeEditPost} className={styles["overlay"]} />
      )}
    </>
  );
}
