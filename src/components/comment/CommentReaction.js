import React, { useEffect, useState } from "react";
import { API_comments } from "../../config";

import reactionsIcon from "../../reactions";
import socket from "../../socket";
import styles from "./CommentReaction.module.css";

export default function CommentReaction(props) {
  const [commentReactions, setCommentReactions] = useState(
    props.commentReactions
  );
  const [reactionSocket, setReactionSocket] = useState(null);

  socket.on(props.commentId + "commentreactions", (data) => {
    console.log(data);
    setReactionSocket(data);
  });

  useEffect(async () => {
    if (reactionSocket) {
      try {
        const response = await fetch(
          `${API_comments}/${props.commentId}/reactions`
        );
        const reactions = await response.json();
        console.log("fetch api");

        setCommentReactions(reactions);
      } catch (error) {
        console.log(error);
      } finally {
        setReactionSocket(null);
      }
    }
  }, [reactionSocket]);

  const getTwoMostReactions = (reactions) => {
    const uniqueReaction = new Set(reactions.map((item) => item.type));
    const result = Array.from(uniqueReaction).map((reaction) => {
      const reactionCount = reactions.filter(
        (item) => item.type === reaction
      ).length;

      return {
        type: reaction,
        count: reactionCount,
      };
    });

    return result.sort((a, b) => b.count - a.count).slice(0, 2);
  };

  const twoMostReactions = getTwoMostReactions(commentReactions);

  return (
    <>
      {commentReactions.length > 0 && (
        <div className={styles["comment__reaction"]}>
          <div className={styles["comment__reaction-icon"]}>
            {twoMostReactions.map((reaction, index) => {
              const reactionIcon = reactionsIcon.find(
                (item) => item.type === reaction.type
              ).icon;

              return <img src={reactionIcon} key={index} alt={reaction.type} />;
            })}
          </div>
          <span>{commentReactions.length}</span>
        </div>
      )}
    </>
  );
}
