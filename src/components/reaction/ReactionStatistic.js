import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "../ui/Card";

import reactionsIcon from "../../reactions";

import styles from "./ReactionStatistic.module.css";
import Button from "../ui/Button";

export default function ReactionStatistic(props) {
  const reactions = props.reactions;
  const reactionInformation = props.reactionInformation;

  const getUniqueReactions = (reactions) => {
    const uniqueReactions = new Set(reactions.map((item) => item.type));

    return Array.from(uniqueReactions);
  };

  const getCountReactions = (uniqueReactions, reactions) => {
    return uniqueReactions
      .map((type) => {
        return {
          type,
          count: reactions.filter((reaction) => reaction.type === type).length,
        };
      })
      .sort((a, b) => b - a);
  };

  const reactionsCount = getCountReactions(
    getUniqueReactions(reactions),
    reactions
  );

  const changeTabReactionHandler = (e) => {
    props.setTypeReactionInformation(e.target.closest("li").dataset.type);
  };

  return (
    <Card className={styles["modal"]}>
      <div className={styles["modal__top"]}>
        <nav className={styles["modal__nav"]}>
          <ul>
            <li
              className={
                reactionInformation.type === "all" ? styles["active--all"] : ""
              }
              onClick={changeTabReactionHandler}
              data-type="all"
            >
              Tất cả
            </li>
            {reactionsCount.map((reaction) => {
              const reactionIcon = reactionsIcon.find(
                (icon) => icon.type === reaction.type
              ).icon;

              return (
                <li
                  className={
                    reactionInformation.type === reaction.type
                      ? styles[`active--${reaction.type}`]
                      : ""
                  }
                  onClick={changeTabReactionHandler}
                  key={reaction.type}
                  data-type={reaction.type}
                >
                  <img src={reactionIcon} alt={reaction.type} />
                  {reaction.count}
                </li>
              );
            })}
          </ul>
        </nav>
        <div onClick={props.onClose} className={styles["modal__close"]}>
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div className={styles["reaction__list"]}>
        {reactionInformation.reactions.map((item) => (
          <div key={item.user._id} className={styles["reaction__item"]}>
            <div className={styles["reaction__image"]}>
              <Link to={`/${item.user._id}/profile/`}>
                <img src={item.user.avatar} alt={item.user.fullName} />
              </Link>
            </div>
            <div>
              <Link
                className={styles["reaction__name"]}
                to={`/${item.user._id}/profile/`}
              >
                {item.user.fullName}
              </Link>
            </div>
            <div className={styles["reaction__action"]}>
              {/* <Button>
              <i className="fas fa-user-plus"></i>
              Thêm bạn bè
            </Button> */}

              <Button>
                <i className="fas fa-comment"></i>
                Nhắn tin
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
