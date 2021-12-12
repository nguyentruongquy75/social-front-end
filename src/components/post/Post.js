import React, { useContext, useEffect, useState } from "react";
import Card from "../ui/Card";

import styles from "./Post.module.css";
import PostSetting from "./PostSetting";

import GridImage from "react-fb-image-grid";

import PostAction from "./PostAction";

import reactionsIcon from "../../reactions";
import PostComment from "./PostComment";
import { API_post } from "../../config";

export default function Post(props) {
  const post = props.post;
  const publishedAt = new Date(props.post.publishedAt);
  const comments = props.post.comments;

  const [reactions, setReactions] = useState(props.post.reactions);
  const [isDisplayComment, setIsDisplayComment] = useState(false);
  const [fetchReaction, setFetchReaction] = useState(false);
  const [reactionInformation, setReactionInformation] = useState({
    isDisplay: false,
    type: "",
    reactions: [],
  });

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
  const setReactionsInformation = (reactions) =>
    setReactionInformation((reactionInformation) => ({
      ...reactionInformation,
      reactions,
    }));

  const twoMostReactions = getTwoMostReactions(reactions);

  // event mouse up reaction
  const hoverReaction = (e) => {
    setFetchReaction(true);
    displayReactionInformation();
    setTypeReactionInformation(e.target.dataset.type);
  };

  // event mouse out reaction
  const mouseOutReaction = (e) => {
    hideReactionInformation();
  };

  // fetch reactions
  useEffect(async () => {
    if (fetchReaction) {
      try {
        const response = await fetch(`${API_post}/${post._id}/reactions`);
        const reactions = await response.json();

        setReactions(reactions);
      } catch (error) {
        console.log(error);
      }
    }
  }, [fetchReaction]);

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

  return (
    <Card className={styles.card}>
      <div className={styles["post__top"]}>
        <div className={styles.user}>
          <div className={styles["user__img"]}>
            <img src={post.user.avatar} alt={post.user.fullName} />
          </div>
          <div>
            <h6 className={styles["user__name"]}>{post.user.fullName}</h6>
            <span className={styles["published-at"]}>
              {convertDurationToString(duration)}
            </span>
          </div>
        </div>

        <PostSetting
          onChange={props.onChange}
          user={post.user}
          postId={post._id}
        />
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
              >
                {reactions.length}
              </span>
            )}
            {reactionInformation.isDisplay && (
              <Card className={styles["post__reactions-infomation"]}>
                <h4>
                  {reactionInformation.type !== "all"
                    ? reactionInformation.type
                    : null}
                </h4>
                <ul>
                  {reactionInformation.reactions.slice(0, 10).map((item) => (
                    <li key={item.user._id}>{item.user.fullName}</li>
                  ))}
                  {reactionInformation.reactions.length > 10 && (
                    <li>
                      và {reactionInformation.reactions.length - 10} người khác
                      ...
                    </li>
                  )}
                </ul>
              </Card>
            )}
          </div>
          <div className={styles["post__info-right"]}>
            {comments.length > 0 && <span>{comments.length} bình luận</span>}
            {/* <span>43 lượt chia sẻ</span> */}
          </div>
        </div>

        <PostAction
          setReactions={setReactions}
          reactions={reactions}
          postId={post._id}
          onComment={displayComment}
        />
      </div>

      {isDisplayComment && <PostComment postId={post._id} />}
    </Card>
  );
}
