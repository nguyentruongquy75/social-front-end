import React, { useContext, useState } from "react";
import Card from "../ui/Card";

import styles from "./Post.module.css";
import PostSetting from "./PostSetting";

import GridImage from "react-fb-image-grid";

import PostAction from "./PostAction";

import reactionsIcon from "../../reactions";
import PostComment from "./PostComment";

export default function Post(props) {
  const postId = props.post._id;
  const title = props.post.title;
  const images = props.post.image;
  const user = props.post.user;
  const publishedAt = new Date(props.post.publishedAt);
  const comments = props.post.comments;

  const [reactions, setReactions] = useState(props.post.reactions);
  const [isDisplayComment, setIsDisplayComment] = useState(false);

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

  const displayComment = () => {
    setIsDisplayComment(true);
  };

  const twoMostReactions = getTwoMostReactions(reactions);

  return (
    <Card className={styles.card}>
      <div className={styles["post__top"]}>
        <div className={styles.user}>
          <div className={styles["user__img"]}>
            <img
              src="https://scontent.fsgn10-1.fna.fbcdn.net/v/t1.6435-9/70513320_885720811802987_8708970306393341952_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=7J16PulCIskAX-NF796&_nc_oc=AQn7SxBbRE7eyWXAsTaSIZ48sUL_md7ASSsrvXM5a5ul1xC2SLhGOuQ92ZnNZOPeEqtqUR-4Xd-D4cGbBKOLWbmf&_nc_ht=scontent.fsgn10-1.fna&oh=42849fdd2693290201e7571a9a840d1d&oe=61CB9962"
              alt="Avatar"
            />
          </div>
          <div>
            <h6
              className={styles["user__name"]}
            >{`${user.lastName} ${user.firstName}`}</h6>
            <span className={styles["published-at"]}>
              {convertDurationToString(duration)}
            </span>
          </div>
        </div>

        <PostSetting />
      </div>

      <div className={styles["post__content"]}>
        <p>{title}</p>
      </div>
      <div className={styles["post__img"]}>
        <GridImage
          images={images || []}
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

                  return <img key={reaction.type} src={reactionIcon} />;
                })}
              </div>
            )}
            {reactions.length > 0 && (
              <span className={styles["post__reactions-text"]}>
                {reactions.length}
              </span>
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
          postId={postId}
          onComment={displayComment}
        />
      </div>

      {isDisplayComment && <PostComment postId={postId} />}
    </Card>
  );
}
