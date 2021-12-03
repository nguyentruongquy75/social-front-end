import React from "react";

import Post from "./Post";

export default function PostList(props) {
  return (
    <>
      {props.list &&
        props.list.map((post) => <Post key={post._id} post={post} />)}
    </>
  );
}
