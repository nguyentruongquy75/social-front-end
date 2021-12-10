import React, { useEffect, useState } from "react";
import { API_post } from "../../config";

import Comment from "../comment/Comment";
import CommentInput from "../comment/CommentInput";
import Spinner from "../spinner/Spinner";

import styles from "./PostComment.module.css";

export default function PostComment(props) {
  const postId = props.postId;

  const [status, setStatus] = useState("initial");
  const [comments, setComments] = useState([]);

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
  }, []);

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
          <Comment reply={comment.reply} key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
