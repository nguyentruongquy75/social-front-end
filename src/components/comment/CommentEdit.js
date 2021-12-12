import React, { useRef, useEffect, useState } from "react";

import Button from "../ui/Button";

import styles from "./CommentEdit.module.css";

import { API_comments } from "../../config";

export default function CommentEdit(props) {
  const textareaRef = useRef();
  const saveButtonRef = useRef();
  const [message, setMessage] = useState(props.message);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const submitCommentHandler = (e) => {
    e.preventDefault();
    setIsFormSubmit(true);
  };
  const messageChangeHandler = (e) => setMessage(e.target.value);

  // submit comment

  useEffect(async () => {
    if (isFormSubmit) {
      try {
        const response = await fetch(`${API_comments}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: props.commentId,
            message,
          }),
        });
        props.onCommentChange();
      } catch (error) {
        console.log(error);
      } finally {
        setIsFormSubmit(false);
        props.onClose();
      }
    }
  }, [isFormSubmit]);

  // focus input
  useEffect(() => {
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(
      props.message.length,
      props.message.length
    );
  }, []);

  // disable button

  useEffect(() => {
    saveButtonRef.current.disabled = message.trim() === props.message;
  }, [message]);

  return (
    <div className={styles["comment__edit"]}>
      <form onSubmit={submitCommentHandler}>
        <textarea
          onChange={messageChangeHandler}
          ref={textareaRef}
          defaultValue={message}
        />
        <div className={styles["comment__edit-action"]}>
          <Button
            type="button"
            onClick={props.onClose}
            className={styles["button"]}
          >
            Huỷ
          </Button>
          <Button
            type="submit"
            ref={saveButtonRef}
            className={`${styles["button"]} ${styles["button--blue"]}`}
          >
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
}
