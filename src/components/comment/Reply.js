import React from "react";

import Comment from "./Comment";

export default function Reply(props) {
  const reply = props.reply;

  console.log("reaply", reply);
  return (
    <div>
      {reply.map((item) => (
        <Comment reply={item.reply} key={item._id} comment={item} />
      ))}
    </div>
  );
}
