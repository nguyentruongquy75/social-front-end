import React from "react";

const Button = React.forwardRef((props, ref) => {
  return (
    <button ref={ref} className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
});

export default Button;
