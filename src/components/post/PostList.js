import React from "react";
import Spinner from "../spinner/Spinner";

import Post from "./Post";
import styles from "./PostList.module.css";
export default function PostList(props) {
  return (
    <>
      {props.status === "loading" && (
        <div className={styles.loading}>
          <Spinner className={styles.spinner} />
        </div>
      )}

      {props.status === "finished" && props.list.length === 0 && (
        <span className={styles.message}>Bản tin trống</span>
      )}
      {props.status === "finished" &&
        props.list.length > 0 &&
        props.list.map((post) => (
          <Post onChange={props.onChange} key={post._id} post={post} />
        ))}
    </>
  );
}
