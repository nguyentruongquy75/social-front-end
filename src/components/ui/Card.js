import React from "react";

import styles from "./Card.module.css";

const Card = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={`${styles.card} ${props.className ? props.className : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
});

export default Card;
