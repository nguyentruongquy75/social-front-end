import React from "react";

export default function Messenger(props) {
  return (
    <li>
      <i className="fab fa-facebook-messenger"></i>

      <div className={props.count}>1</div>
    </li>
  );
}
