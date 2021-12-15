import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_post } from "../../config";

import Comment from "../comment/Comment";
import CommentInput from "../comment/CommentInput";
import Spinner from "../spinner/Spinner";

import styles from "./PostComment.module.css";

export default function PostComment(props) {
  const postId = props.postId;
  const postAuthId = props.postAuthId;
  const location = useLocation();

  const [status, setStatus] = useState("initial");
  const [comments, setComments] = useState([]);
  const [hasChange, setHasChange] = useState(false);

  const changeComment = () => setHasChange((prev) => !prev);

  useEffect(async () => {
    setStatus("loading");
    try {
      const response = await fetch(`${API_post}/${postId}/comments`);
      const comments = await response.json();

      setComments(comments);
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("finished");
    }
  }, [hasChange]);

  // scroll to hash
  useEffect(() => {
    if (status === "finished" && location.hash) {
      const activeComment = document.getElementById(location.hash.slice(1));
      const commentInfo = activeComment.children[1].children[0];
      commentInfo.classList.add(styles.active);
      activeComment.scrollIntoView();
      const removeActive = () => commentInfo.classList.remove(styles.active);

      document.addEventListener("mousedown", removeActive);

      return () => document.removeEventListener("mousedown", removeActive);
    }
  }, [status]);

  return (
    <div className={styles["post__comment"]}>
      <CommentInput setComments={setComments} postId={postId} />
      <div className={styles["comment__list"]}>
        {status === "loading" && (
          <div className={styles.loading}>
            <Spinner className={styles["spinner"]} />
          </div>
        )}
        {comments.map((comment) => (
          <Comment
            onCommentChange={changeComment}
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
