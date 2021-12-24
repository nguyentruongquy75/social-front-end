import React, { useEffect, useState } from "react";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Spinner from "../spinner/Spinner";

import { API_comments } from "../../config";

import styles from "./Reply.module.css";

import socket from "../../socket";

export default function Reply(props) {
  const [isDisplayReplyComments, setIsDisplayReplyComment] = useState(false);
  const [reply, setReply] = useState([]);
  const [status, setStatus] = useState("initial");
  const [replySocket, setReplySocket] = useState(null);
  const [hasChange, setHasChange] = useState(false);

  // displayReplyComment
  const displayReplyComments = () => setIsDisplayReplyComment(true);

  // change reply
  const changeReply = () => setHasChange((hasChange) => !hasChange);

  //reply socket
  socket.on(props.commentId + "commentreply", (data) => {
    setReplySocket(data);
    console.log(data);
  });

  useEffect(() => {
    if (replySocket) {
      changeReply();
    }
  }, [replySocket]);

  // get reply
  useEffect(async () => {
    if (isDisplayReplyComments) {
      try {
        setStatus("loading");
        const response = await fetch(
          `${API_comments}/${props.commentId}/reply`
        );
        const reply = await response.json();
        setReply(reply);
        setStatus("finished");

        console.log("fetch");
      } catch (error) {
        console.log(error);
      } finally {
        replySocket && setReplySocket(null);
      }
    }
  }, [isDisplayReplyComments, hasChange]);

  return (
    <>
      {!isDisplayReplyComments && props.replyCount > 0 && (
        <div
          onClick={displayReplyComments}
          className={styles["comment__reply"]}
        >
          <i className="fas fa-reply"></i> {props.replyCount} phản hồi
          {status === "loading" && <Spinner className={styles.spinner} />}
        </div>
      )}
      <div>
        {isDisplayReplyComments &&
          reply.map((item) => (
            <Comment
              onCommentChange={changeReply}
              reply={item.reply}
              key={item._id}
              comment={item}
            />
          ))}
      </div>
      {props.isDisplayReplyInput && (
        <div>
          <CommentInput
            displayReplyComments={displayReplyComments}
            commentId={props.commentId}
          />
        </div>
      )}
    </>
  );
}
