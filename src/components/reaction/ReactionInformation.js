import React from "react";
import Spinner from "../spinner/Spinner";

import Card from "../ui/Card";

import styles from "./ReactionInformation.module.css";

export default function ReactionInformation(props) {
  return (
    <Card className={styles["post__reactions-infomation"]}>
      <h4>
        {props.reactionInformation.type !== "all"
          ? props.reactionInformation.type
          : null}
      </h4>
      <ul>
        {props.reactionInformation.status === "loading" && (
          <div className={styles["loading"]}>
            <Spinner />
          </div>
        )}
        {props.reactionInformation.reactions.slice(0, 10).map((item) => (
          <li key={item._id}>{item.user.fullName}</li>
        ))}
        {props.reactionInformation.reactions.length > 10 && (
          <li>
            và {props.reactionInformation.reactions.length - 10} người khác ...
          </li>
        )}
      </ul>
    </Card>
  );
}
