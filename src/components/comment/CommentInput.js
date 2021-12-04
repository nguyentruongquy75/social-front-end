import React, { useContext, useEffect, useRef, useState } from "react";
import { API_comments } from "../../config";
import userContext from "../../context/userCtx";

import styles from "./CommentInput.module.css";

export default function CommentInput(props) {
  const [isSendComment, setIsSendComment] = useState(false);
  const inputRef = useRef();
  const context = useContext(userContext);
  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      setIsSendComment(true);
    }
  };

  useEffect(async () => {
    if (isSendComment) {
      try {
        let response;
        if (props.postId) {
          response = await fetch(API_comments, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: inputRef.current.value,
              user: context.id,
              post: props.postId,
            }),
          });
        } else if (props.commentId) {
          response = await fetch(`${API_comments}/${props.commentId}/reply`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: inputRef.current.value,
              user: context.id,
            }),
          });
        }

        const newComment = await response.json();
        console.log(newComment);

        props.setComments((comments) => [...comments, newComment]);
        inputRef.current.value = "";
      } catch (error) {
        console.log(error);
      } finally {
        setIsSendComment(false);
      }
    }
  }, [isSendComment]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles["comment__input"]}>
      <div className={styles.avatar}>
        <img
          src="https://images.unsplash.com/photo-1638385583493-484240554d5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />
      </div>
      <div className={styles["comment__input-container"]}>
        <input
          ref={inputRef}
          onKeyUp={pressEnter}
          type="text"
          placeholder="Viết bình luận ..."
        />
      </div>
    </div>
  );
}
