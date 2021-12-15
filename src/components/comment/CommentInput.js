import React, { useContext, useEffect, useRef, useState } from "react";
import { API_comments } from "../../config";
import userContext from "../../context/userCtx";
import Spinner from "../spinner/Spinner";

import styles from "./CommentInput.module.css";

export default function CommentInput(props) {
  const [isSendComment, setIsSendComment] = useState(false);
  const [status, setStatus] = useState("initial");
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
        setStatus("loading");
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
        setStatus("finished");
      }
    }
  }, [isSendComment]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles["comment__input"]}>
      <div className={styles.avatar}>
        <img src={context.avatar} alt={context.fullName} />
      </div>
      <div className={styles["comment__input-container"]}>
        {status === "loading" && (
          <div className={styles["loading"]}>
            <Spinner />
          </div>
        )}
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
