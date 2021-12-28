import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

import styles from "./Post.module.css";
import PostSetting from "./PostSetting";

import GridImage from "react-fb-image-grid";

import PostAction from "./PostAction";

import reactionsIcon from "../../reactions";
import PostComment from "./PostComment";
import { API_post } from "../../config";
import ReactionInformation from "../reaction/ReactionInformation";
import ReactionStatistic from "../reaction/ReactionStatistic";
import Overlay from "../overlay/Overlay";
import userContext from "../../context/userCtx";

import socket from "../../socket";

export default function Post(props) {
  const post = props.post;
  const publishedAt = new Date(props.post.publishedAt);
  const context = useContext(userContext);

  // get change reaction
  const [hasChangePostReaction, setHasChangePostReaction] = useState(false);
  const [hasChangePostComment, setHasChangePostComment] = useState(false);

  const [reactions, setReactions] = useState([]);
  const [comments, setComments] = useState([]);
  const [isDisplayComment, setIsDisplayComment] = useState(
    props.isDisplayComment || false
  );
  const [reactionInformation, setReactionInformation] = useState({
    isDisplay: false,
    status: "initial",
    type: "",
    reactions: [],
  });
  const [isDisplayReactionStatistic, setIsDisplayReactionStatistic] =
    useState(false);

  const [reactionSocket, setReactionSocket] = useState(null);
  const [commentSocket, setCommentSocket] = useState(null);

  const duration = Date.now() - publishedAt;

  const convertDurationToString = (duration) => {
    const seconds = duration / 1000;
    const minutes = seconds / 60;

    if (seconds < 60) {
      return "Vừa xong";
    }

    if (minutes < 60) {
      return `${Math.floor(minutes)} phút trước`;
    }
    const hours = minutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)} giờ trước`;
    }

    const days = hours / 24;

    return `${Math.floor(days)} ngày trước`;
  };

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

  const displayComment = () => {
    setIsDisplayComment(true);
  };

  // reaction information
  const displayReactionInformation = () =>
    setReactionInformation((reactionInformation) => ({
      ...reactionInformation,
      isDisplay: true,
    }));

  const hideReactionInformation = () =>
    setReactionInformation((reactionInformation) => ({
      ...reactionInformation,
      isDisplay: false,
    }));

  const setTypeReactionInformation = (type) =>
    setReactionInformation((reactionInformation) => ({
      ...reactionInformation,
      type,
    }));
  const setStatusReactionInformation = (status) =>
    setReactionInformation((reactionInformation) => ({
      ...reactionInformation,
      status,
    }));
  const setReactionsInformation = (reactions) =>
    setReactionInformation((reactionInformation) => ({
      ...reactionInformation,
      reactions,
    }));

  const twoMostReactions = getTwoMostReactions(reactions);

  // event mouse up reaction
  const hoverReaction = (e) => {
    displayReactionInformation();
    setTypeReactionInformation(e.target.dataset.type);
  };

  // event mouse out reaction
  const mouseOutReaction = (e) => {
    hideReactionInformation();
  };

  // reaction statistic
  const displayReactionStatistic = () => setIsDisplayReactionStatistic(true);
  const hideReactionStatistic = () => setIsDisplayReactionStatistic(false);

  // change post reaction
  const changePostReaction = () =>
    setHasChangePostReaction((hasChange) => !hasChange);

  // change post comment
  const changePostComment = () =>
    setHasChangePostComment((hasChange) => !hasChange);

  // count comment
  const calculateCommentCount = () => {
    return comments.reduce((sum, curr) => {
      return sum + curr.reply.length + 1;
    }, 0);
  };

  //reaction socket
  socket.on(post._id + "postreactions", (data) => {
    setReactionSocket(data);
  });

  useEffect(() => {
    if (reactionSocket) {
      changePostReaction();
    }
  }, [reactionSocket]);

  //comment socket
  socket.on(post._id + "postcomment", (data) => {
    setCommentSocket(data);
  });

  useEffect(() => {
    if (commentSocket) {
      changePostComment();
    }
  }, [commentSocket]);

  // fetch comments
  useEffect(async () => {
    try {
      const response = await fetch(`${API_post}/${post._id}/comments`);
      const comments = await response.json();

      setComments(comments);
    } catch (error) {
      console.log(error);
    } finally {
      setCommentSocket(null);
    }
  }, [hasChangePostComment]);

  // fetch reactions
  useEffect(async () => {
    try {
      setStatusReactionInformation("loading");
      const response = await fetch(`${API_post}/${post._id}/reactions`);
      const reactions = await response.json();
      setReactions(reactions);
    } catch (error) {
      console.log(error);
    } finally {
      setStatusReactionInformation("finished");
      reactionSocket && setReactionSocket(null);
    }
  }, [hasChangePostReaction]);

  // change type reaction
  useEffect(() => {
    if (reactionInformation.type !== "") {
      let reactionList = reactions;
      if (reactionInformation.type !== "all") {
        reactionList = reactions.filter(
          (item) => item.type === reactionInformation.type
        );
      }

      setReactionsInformation(reactionList);
    }
  }, [reactions, reactionInformation.type]);

  // css for display reaction statistic
  useEffect(() => {
    if (isDisplayReactionStatistic) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = null;
    }
  }, [isDisplayReactionStatistic]);

  return (
    <>
      <Card
        className={`${styles.card} ${props.className ? props.className : ""}`}
      >
        <div className={styles["post__top"]}>
          <div className={styles.user}>
            <div className={styles["user__img"]}>
              <Link
                to={
                  context.id === post.user._id
                    ? "/profile/"
                    : `/${post.user._id}/profile/`
                }
              >
                <img src={post.user.avatar} alt={post.user.fullName} />
              </Link>
            </div>
            <div>
              <Link
                to={
                  context.id === post.user._id
                    ? "/profile/"
                    : `/${post.user._id}/profile/`
                }
              >
                <h6 className={styles["user__name"]}>{post.user.fullName}</h6>
              </Link>
              <span className={styles["published-at"]}>
                {convertDurationToString(duration)}
              </span>
            </div>
          </div>

          <PostSetting post={post} user={post.user} postId={post._id} />
        </div>

        <div className={styles["post__content"]}>
          <p>{post.title}</p>
        </div>
        <div className={styles["post__img"]}>
          <GridImage
            images={post.image || []}
            countFrom={3}
            renderOverlay={() => ""}
            overlayBackgroundColor={"#0000"}
            className={styles["grid"]}
          />
        </div>

        <div className={styles["post__bottom"]}>
          <div className={styles["post__info"]}>
            <div className={styles["post__reactions"]}>
              {reactions.length > 0 && (
                <div>
                  {twoMostReactions.map((reaction) => {
                    const reactionIcon = reactionsIcon.find(
                      (item) => item.type === reaction.type
                    ).icon;

                    return (
                      <img
                        onMouseOver={hoverReaction}
                        onMouseOut={mouseOutReaction}
                        data-type={reaction.type}
                        key={reaction.type}
                        src={reactionIcon}
                        onClick={displayReactionStatistic}
                      />
                    );
                  })}
                </div>
              )}
              {reactions.length > 0 && (
                <span
                  data-type="all"
                  onMouseOver={hoverReaction}
                  onMouseOut={mouseOutReaction}
                  className={styles["post__reactions-text"]}
                  onClick={displayReactionStatistic}
                >
                  {reactions.length}
                </span>
              )}
              {reactionInformation.isDisplay && (
                <ReactionInformation
                  reactionInformation={reactionInformation}
                />
              )}
            </div>
            <div className={styles["post__info-right"]}>
              {comments.length > 0 && (
                <span>{calculateCommentCount()} bình luận</span>
              )}
              {/* <span>43 lượt chia sẻ</span> */}
            </div>
          </div>

          <PostAction
            reactions={reactions}
            postId={post._id}
            onComment={displayComment}
            changePostReaction={changePostReaction}
          />
        </div>

        {isDisplayComment && (
          <PostComment
            comments={comments}
            postAuthId={post.user._id}
            postId={post._id}
            onCommentChange={changePostComment}
            setIsDisplayComment={setIsDisplayComment}
          />
        )}
      </Card>
      {isDisplayReactionStatistic && (
        <>
          <ReactionStatistic
            reactions={reactions}
            reactionInformation={reactionInformation}
            onClose={hideReactionStatistic}
            setTypeReactionInformation={setTypeReactionInformation}
          />
          <Overlay onClick={hideReactionStatistic} />
        </>
      )}
    </>
  );
}
