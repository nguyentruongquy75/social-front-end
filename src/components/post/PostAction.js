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
    (reaction) => reaction.user._id === context.id
  );

  const initialReaction = authReaction
    ? reactionsIcon.find((reaction) => reaction.type === authReaction.type)
    : null;
  const [reaction, setReaction] = useState(initialReaction);
  const [isDisplayReactionHover, setIsDisplayReactionHover] = useState(true);

  const hideReactionHover = (e) => {
    e.stopPropagation();
    setIsDisplayReactionHover(false);
  };

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

  // initial reaction
  useEffect(() => {
    setReaction(
      authReaction
        ? reactionsIcon.find((reaction) => reaction.type === authReaction.type)
        : null
    );
  }, [reactions]);

  // add reaction
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
      }
      props.changePostReaction();
    }
  }, [reaction]);

  // Hover
  useEffect(() => {
    if (!isDisplayReactionHover) {
      const id = setTimeout(() => {
        setIsDisplayReactionHover(true);
      }, 500);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isDisplayReactionHover]);

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
        {isDisplayReactionHover && (
          <div onClick={hideReactionHover} className={styles.reactions}>
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
        )}
      </Button>

      <Button onClick={props.onComment}>
        <i className="far fa-comment"></i>
        Comment
      </Button>
    </div>
  );
}
