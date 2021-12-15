import React, { useEffect, useState } from "react";

import Post from "../components/post/Post";

import { useParams } from "react-router-dom";
import { API_post } from "../config";

import styles from "./PostDetailPage.module.css";

export default function PostDetailPage() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(async () => {
    try {
      const response = await fetch(`${API_post}/${params.id}`);

      const post = await response.json();
      console.log(post);
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={styles["container"]}>
      {post && (
        <Post className={styles["post"]} isDisplayComment={true} post={post} />
      )}
    </div>
  );
}
