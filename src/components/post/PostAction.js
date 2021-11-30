import React from "react";

import Button from "../ui/Button";

import styles from "./PostAction.module.css";

// image

import LikeIcon from "../../assets/img/like.png";
import LoveIcon from "../../assets/img/love.png";
import CareIcon from "../../assets/img/care.png";
import HahaIcon from "../../assets/img/haha.png";
import WowIcon from "../../assets/img/wow.png";
import SadIcon from "../../assets/img/sad.png";
import AngryIcon from "../../assets/img/angry.png";

const reactionsArr = ["like", "love", "care", "haha", "wow", "sad", "angry"];

export default function PostAction() {
  return (
    <div className={styles["post-action"]}>
      <Button>
        <i className="far fa-thumbs-up"></i>
        Like
        <div className={styles.reactions}>
          <div>
            <img src={LikeIcon} alt="like" />
          </div>

          <div>
            <img src={LoveIcon} alt="love" />
          </div>

          <div>
            <img src={CareIcon} alt="care" />
          </div>

          <div>
            <img src={HahaIcon} alt="haha" />
          </div>

          <div>
            <img src={SadIcon} alt="sad" />
          </div>

          <div>
            <img src={WowIcon} alt="wow" />
          </div>

          <div>
            <img src={AngryIcon} alt="angry" />
          </div>
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
