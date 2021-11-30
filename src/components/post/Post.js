import React from "react";
import Card from "../ui/Card";

import styles from "./Post.module.css";
import PostSetting from "./PostSetting";

import GridImage from "react-fb-image-grid";

// reactions
import SadIcon from "../../assets/img/sad.png";
import AngryIcon from "../../assets/img/angry.png";
import PostAction from "./PostAction";

const test = [
  "https://images.unsplash.com/photo-1638063761244-57fee5d1d1f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1638137392998-cd8a1b4775b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
];

export default function Post() {
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
            <h6 className={styles["user__name"]}>Nguyen Truong Quy</h6>
            <span className={styles["published-at"]}>15 minutes ago</span>
          </div>
        </div>

        <PostSetting />
      </div>

      <div className={styles["post__content"]}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod enim,
          voluptas atque non error neque ab, placeat nobis corrupti, voluptate
          quisquam? Numquam eos dignissimos neque asperiores fugiat cupiditate
          sed. Quia?
        </p>
      </div>
      <div className={styles["post__img"]}>
        <GridImage
          images={test}
          countFrom={3}
          renderOverlay={() => ""}
          overlayBackgroundColor={"#0000"}
          className={styles["grid"]}
        />
      </div>

      <div className={styles["post__bottom"]}>
        <div className={styles["post__info"]}>
          <div className={styles["post__reactions"]}>
            <div>
              <img src={SadIcon} alt="" />
              <img src={AngryIcon} alt="" />
            </div>

            <span className={styles["post__reactions-text"]}>
              Truong Quy va 17 nguoi khac
            </span>
          </div>
          <div className={styles["post__info-right"]}>
            <span>553 bình luận</span>
            <span>43 lượt chia sẻ</span>
          </div>
        </div>

        <PostAction />
      </div>
    </Card>
  );
}
