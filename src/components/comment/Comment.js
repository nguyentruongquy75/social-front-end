import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./Comment.module.css";

import reactionsIcon from "../../reactions";
import CommentInput from "./CommentInput";
import userContext from "../../context/userCtx";

import { API_comments } from "../../config";
import Reply from "./Reply";
import Spinner from "../spinner/Spinner";
import Card from "../ui/Card";
import CommentEdit from "./CommentEdit";
import CommentReaction from "./CommentReaction";

function Comment(props) {
  const context = useContext(userContext);
  const comment = props.comment;
  const fullName = comment.user.fullName;
  const commentSettingModalRef = useRef();

  const [isDisplayReplyInput, setIsDisplayReplyInput] = useState(false);
  const [isDisplayReactionHover, setIsDisplayReactionHover] = useState(false);
  const [commentReactions, setCommentReactions] = useState(comment.reactions);

  const [isDisplayCommentSetting, setIsDisplayCommentSetting] = useState(false);
  const [isRemoveComment, setIsRemoveComment] = useState(false);

  const [editComment, setEditComment] = useState({
    isDisplay: false,
    status: "initial",
  });

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

  const displayReplyInput = () => {
    setIsDisplayReplyInput(true);
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

  const removeComment = () => {
    setIsRemoveComment(true);
    hideCommentSetting();
  };

  // duration
  const duration = Date.now() - new Date(comment.createAt);
  const convertDurationToString = (duration) => {
    const seconds = duration / 1000;
    const minutes = seconds / 60;

    if (seconds < 60) {
      return "Vừa xong";
    }

    if (minutes < 60) {
      return `${Math.floor(minutes)} phút`;
    }
    const hours = minutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)} giờ`;
    }

    const days = hours / 24;

    return `${Math.floor(days)} ngày`;
  };

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
    setEditComment((prev) => ({
      ...prev,
      isDisplay: true,
    }));
    hideCommentSetting();
  };

  const hideCommentEdit = () =>
    setEditComment((prev) => ({
      ...prev,
      isDisplay: false,
    }));

  const changeStatusEditComment = (status) =>
    setEditComment((prev) => ({
      ...prev,
      status,
    }));

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

  // remove comment
  useEffect(async () => {
    if (isRemoveComment) {
      try {
        const response = await fetch(
          `${API_comments}${
            comment.replyOf ? `/${comment.replyOf}/reply` : ""
          }`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: comment._id,
            }),
          }
        );

        props.onCommentChange && props.onCommentChange();
      } catch (error) {
        console.log(error);
      }
    }
  }, [isRemoveComment]);

  return (
    <div className={styles["comment"]} id={comment._id}>
      <div className={styles["comment__avatar"]}>
        <img src={comment.user.avatar} alt={comment.user.fullName} />
      </div>

      <div className={styles["comment__info-container"]}>
        <div className={styles["comment__info"]}>
          <h6>{fullName}</h6>
          {editComment.isDisplay && (
            <CommentEdit
              message={comment.message}
              onClose={hideCommentEdit}
              commentId={comment._id}
              onCommentChange={props.onCommentChange}
              changeStatusEditComment={changeStatusEditComment}
            />
          )}

          {!editComment.isDisplay && <p>{comment.message}</p>}

          <CommentReaction
            commentId={comment._id}
            commentReactions={commentReactions}
          />

          {(context.id === props.postAuthId ||
            context.id === comment.user._id) && (
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
                    {context.id === comment.user._id && (
                      <li onClick={displayCommentEdit}>Chỉnh sửa</li>
                    )}
                    <li onClick={removeComment}>Xoá</li>
                  </ul>
                </Card>
              )}
            </div>
          )}

          {editComment.status === "loading" && (
            <div className={styles["remove__loading"]}>Đang lưu ...</div>
          )}
          {isRemoveComment && (
            <div className={styles["remove__loading"]}>Đang xoá ...</div>
          )}
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
          <span className={styles["createAt"]}>
            {convertDurationToString(duration)}
          </span>
        </div>

        <Reply
          commentId={comment._id}
          isDisplayReplyInput={isDisplayReplyInput}
          replyCount={comment.reply.length}
        />
      </div>
    </div>
  );
}

export default React.memo(Comment);
