import React, { useEffect, useState } from "react";

import PostCreate from "../components/post/PostCreate";
import Post from "../components/post/Post";
import ProfileFriends from "../components/profile/ProfileFriends";
import ProfileIntroduction from "../components/profile/ProfileIntroduction";

import styles from "./ProfilePageHome.module.css";
import { API_user } from "../config";
import Spinner from "../components/spinner/Spinner";

export default function ProfilePageHome(props) {
  const [status, setStatus] = useState("initial");
  const [posts, setPosts] = useState([]);
  const [isPostsChange, setIsPostsChange] = useState(false);

  const changePosts = () => setIsPostsChange((isChange) => !isChange);

  useEffect(async () => {
    try {
      setStatus("loading");
      const response = await fetch(`${API_user}/${props.user._id}/posts`);
      const posts = await response.json();

      setPosts(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("finished");
    }
  }, [isPostsChange]);

  return (
    <div className={styles["container"]}>
      <aside>
        <ProfileIntroduction user={props.user} />
        <ProfileFriends friends={props.user.friends} />
      </aside>

      <div>
        <PostCreate onChange={changePosts} />

        {status === "loading" && (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )}

        <div>
          {status === "finished" && posts.length === 0 && (
            <div className={styles["message"]}>
              <span>Chưa có bài viết nào</span>
            </div>
          )}
          {status === "finished" &&
            posts.map((post) => <Post key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
}
