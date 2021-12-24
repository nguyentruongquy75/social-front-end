import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_post } from "../../config";

import Comment from "../comment/Comment";
import CommentInput from "../comment/CommentInput";
import Spinner from "../spinner/Spinner";

import socket from "../../socket";

import styles from "./PostComment.module.css";

export default function PostComment(props) {
  const postId = props.postId;
  const postAuthId = props.postAuthId;
  const location = useLocation();

  // scroll to hash
  useEffect(() => {
    if (location.hash) {
      const activeComment = document.getElementById(location.hash.slice(1));
      if (activeComment) {
        const commentInfo = activeComment.children[1].children[0];
        commentInfo.classList.add(styles.active);
        activeComment.scrollIntoView();
        const removeActive = () => commentInfo.classList.remove(styles.active);

        document.addEventListener("mousedown", removeActive);

        return () => document.removeEventListener("mousedown", removeActive);
      }
    }
  }, []);

  return (
    <div className={styles["post__comment"]}>
      <CommentInput onCommentChange={props.changePostComment} postId={postId} />
      <div className={styles["comment__list"]}>
        {/* {status === "loading" && (
          <div className={styles.loading}>
            <Spinner className={styles["spinner"]} />
          </div>
        )} */}
        {props.comments.map((comment) => (
          <Comment
            onCommentChange={props.changePostComment}
            reply={comment.reply}
            key={comment._id}
            comment={comment}
            postAuthId={postAuthId}
          />
        ))}
      </div>
    </div>
  );
}
