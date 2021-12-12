import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./Comment.module.css";

import reactionsIcon from "../../reactions";
import CommentInput from "./CommentInput";
import userContext from "../../context/userCtx";

import { API_comments } from "../../config";
import Reply from "./Reply";
import Spinner from "../spinner/Spinner";
import Card from "../ui/Card";
import Button from "../ui/Button";
import CommentEdit from "./CommentEdit";

function Comment(props) {
  const context = useContext(userContext);
  const comment = props.comment;
  const fullName = `${comment.user.lastName} ${comment.user.firstName}`;
  const commentSettingModalRef = useRef();

  const [isDisplayReplyInput, setIsDisplayReplyInput] = useState(false);
  const [isDisplayReplyComments, setIsDisplayreplyComments] = useState(false);
  const [isDisplayReactionHover, setIsDisplayReactionHover] = useState(false);
  const [commentReactions, setCommentReactions] = useState(comment.reactions);
  const [reply, setReply] = useState([]);
  const [status, setStatus] = useState("initial");
  const [isDisplayCommentSetting, setIsDisplayCommentSetting] = useState(false);
  const [isRemoveComment, setIsRemoveComment] = useState(false);
  const [isDisplayCommentEdit, setIsDisplayCommentEdit] = useState(false);

  // Reaction
  const authReaction = commentReactions.find(
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

  const displayReplyComments = () => setIsDisplayreplyComments(true);

  const displayReplyInput = () => {
    setIsDisplayReplyInput(true);
    displayReplyComments();
  };

  const getTwoMostReactions = (reactions) => {
    const uniqueReaction = new Set(reactions);

    const result = Array.from(uniqueReaction).map((reaction) => {
      const reactionCount = reactions.filter(
        (item) => item.type === reaction.type
      ).length;

      return {
        type: reaction.type,
        count: reactionCount,
      };
    });

    return result.sort((a, b) => b.count - a.count).slice(0, 2);
  };

  const hideReactionHover = (e) => {
    e.stopPropagation();
    setIsDisplayReactionHover(false);
  };

  // comment setting
  const toggleDisplayCommentSetting = () =>
    setIsDisplayCommentSetting((isDisplay) => !isDisplay);

  const hideCommentSetting = () => setIsDisplayCommentSetting(false);

  const clickOutCommentModalHandler = (e) => {
    if (
      commentSettingModalRef.current &&
      !commentSettingModalRef.current.contains(e.target)
    ) {
      hideCommentSetting();
    }
  };

  // event click out modal
  useEffect(() => {
    document.addEventListener("mousedown", clickOutCommentModalHandler);
    return () => {
      document.addEventListener("mousedown", clickOutCommentModalHandler);
    };
  });

  // remove comment

  const removeComment = () => setIsRemoveComment(true);

  const twoMostReactions = getTwoMostReactions(commentReactions);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsDisplayReactionHover(true);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [isDisplayReactionHover]);

  // edit comment
  const displayCommentEdit = () => {
    setIsDisplayCommentEdit(true);
    hideCommentSetting();
  };

  const hideCommentEdit = () => setIsDisplayCommentEdit(false);

  // send request update reaction of comment
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
            `${API_comments}/${comment._id}/reactions`,
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

          setCommentReactions((prev) => [
            ...prev.filter((item) => item._id !== savedReaction._id),
            savedReaction,
          ]);
        } catch (error) {
          console.log(error);
        }
      } else {
        // remove reaction
        const response = await fetch(
          `${API_comments}/${comment._id}/reactions`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: authReaction._id,
            }),
          }
        );
        const deletedReaction = await response.json();

        setCommentReactions((prev) => [
          ...prev.filter((item) => item._id !== deletedReaction._id),
        ]);
      }
    }
  }, [reaction]);

  // get reply
  useEffect(async () => {
    if (isDisplayReplyComments) {
      setStatus("loading");
      const response = await fetch(`${API_comments}/${comment._id}/reply`);
      const reply = await response.json();
      setReply(reply);
      setStatus("finished");
    }
  }, [isDisplayReplyComments]);

  // remove comment
  useEffect(async () => {
    if (isRemoveComment) {
      try {
        const response = await fetch(`${API_comments}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: comment._id,
          }),
        });

        props.onCommentChange();
      } catch (error) {
        console.log(error);
      }
    }
  }, [isRemoveComment]);

  return (
    <div className={styles["comment"]}>
      <div className={styles["comment__avatar"]}>
        <img src={comment.user.avatar} alt={comment.user.fullName} />
      </div>

      <div className={styles["comment__info-container"]}>
        <div className={styles["comment__info"]}>
          <h6>{fullName}</h6>
          {isDisplayCommentEdit && (
            <CommentEdit
              message={comment.message}
              onClose={hideCommentEdit}
              commentId={comment._id}
              onCommentChange={props.onCommentChange}
            />
          )}

          {!isDisplayCommentEdit && <p>{comment.message}</p>}

          {commentReactions.length > 0 && (
            <div className={styles["comment__reaction"]}>
              <div className={styles["comment__reaction-icon"]}>
                {twoMostReactions.map((reaction, index) => {
                  const reactionIcon = reactionsIcon.find(
                    (item) => item.type === reaction.type
                  ).icon;

                  return (
                    <img src={reactionIcon} key={index} alt={reaction.type} />
                  );
                })}
              </div>
              <span>{commentReactions.length}</span>
            </div>
          )}

          <div
            onClick={toggleDisplayCommentSetting}
            className={styles["comment__setting"]}
          >
            <i className="fas fa-ellipsis-h"></i>
            {isDisplayCommentSetting && (
              <Card
                onClick={(e) => e.stopPropagation()}
                className={styles["comment__setting-modal"]}
                ref={commentSettingModalRef}
              >
                <ul>
                  <li onClick={displayCommentEdit}>Chỉnh sửa</li>
                  <li onClick={removeComment}>Xoá</li>
                </ul>
              </Card>
            )}
          </div>
        </div>
        <div className={styles["comment__action"]}>
          <div
            onClick={toggleButtonHandler}
            className={`${styles["comment__action-reaction"]} ${
              reaction ? styles[reaction.type] : ""
            } `}
          >
            {reaction ? reaction.type : "Like"}
            {isDisplayReactionHover && (
              <div
                onClick={hideReactionHover}
                className={styles["comment__reaction--hover"]}
              >
                {reactionsIcon.map((reaction, index) => (
                  <img
                    src={reaction.icon}
                    alt={reaction.type}
                    key={reaction.type}
                    data-index={index}
                    onClick={changeReaction}
                  />
                ))}
              </div>
            )}
          </div>
          <div
            className={styles["comment__action-reply"]}
            onClick={displayReplyInput}
          >
            Phản hồi
          </div>
        </div>

        {status !== "finished" && props.reply.length > 0 && (
          <div
            onClick={displayReplyComments}
            className={styles["comment__reply"]}
          >
            <i className="fas fa-reply"></i> {props.reply.length} phản hồi
            {status === "loading" && <Spinner className={styles.spinner} />}
          </div>
        )}

        {isDisplayReplyComments && <Reply reply={reply} />}

        {isDisplayReplyInput && (
          <div>
            <CommentInput setComments={setReply} commentId={comment._id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Comment);
