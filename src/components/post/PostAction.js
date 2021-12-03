import React, { useContext, useEffect, useState } from "react";

import Button from "../ui/Button";

import styles from "./PostAction.module.css";

import reactionsIcon from "../../reactions";
import userContext from "../../context/userCtx";
import { API_post } from "../../config";

export default function PostAction(props) {
  const context = useContext(userContext);
  const reactions = props.reactions;

  const authReaction = reactions.find(
    (reaction) => reaction.user === context.id
  );

  const initialReaction = authReaction
    ? reactionsIcon.find((reaction) => reaction.type === authReaction.type)
    : null;
  const [reaction, setReaction] = useState(initialReaction);

  const changeReaction = (e) => {
    const clickedReaction = reactionsIcon[e.target.dataset.index];
    setReaction(clickedReaction);
  };

  const toggleButtonHandler = (e) => {
    if (reaction) {
      setReaction(null);
    } else {
      // default Like
      setReaction(reactionsIcon.find((item) => item.type === "Like"));
    }
  };

  useEffect(async () => {
    if (reaction !== initialReaction) {
      // Add and update reaction
      if (reaction) {
        try {
          const newReaction = {
            type: reaction.type,
            user: context.id,
          };
          if (authReaction) {
            Object.assign(newReaction, {
              _id: authReaction._id,
            });
          }
          const response = await fetch(
            `${API_post}/${props.postId}/reactions`,
            {
              method: authReaction ? "PATCH" : "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newReaction),
            }
          );
          const savedReaction = await response.json();

          // set reaction

          props.setReactions((prev) => [
            ...prev.filter((item) => item._id !== savedReaction._id),
            savedReaction,
          ]);
        } catch (error) {
          console.log(error);
        }
      } else {
        // remove reaction
        const response = await fetch(`${API_post}/${props.postId}/reactions`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: authReaction._id,
          }),
        });
        const deletedReaction = await response.json();

        props.setReactions((prev) => [
          ...prev.filter((item) => item._id !== deletedReaction._id),
        ]);
      }
    }
  }, [reaction]);

  return (
    <div className={styles["post-action"]}>
      <Button
        onClick={toggleButtonHandler}
        className={reaction && styles[reaction.type]}
      >
        {reaction && (
          <>
            <img src={reaction.icon} alt={reaction.type} /> {reaction.type}
          </>
        )}
        {!reaction && (
          <>
            <i className="far fa-thumbs-up"></i> Like
          </>
        )}
        <div onClick={(e) => e.stopPropagation()} className={styles.reactions}>
          {reactionsIcon.map((reaction, index) => (
            <div key={index} onClick={changeReaction}>
              <img
                src={reaction.icon}
                data-index={index}
                alt={`${reaction.type}`}
              />
            </div>
          ))}
        </div>
      </Button>

      <Button>
        <i className="far fa-comment"></i>
        Comment
      </Button>

      <Button>
        <i className="fas fa-share"></i>
        Share
      </Button>
    </div>
  );
}
