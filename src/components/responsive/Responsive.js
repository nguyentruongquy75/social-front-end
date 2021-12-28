import React from "react";

export default function Responsive(props) {
  const minWidth = props.minWidth;
  const maxWidth = props.maxWidth;
  if (minWidth && maxWidth) {
    if (window.innerWidth <= maxWidth && window.innerWidth >= minWidth) {
      return <>{props.children}</>;
    } else {
      return <></>;
    }
  } else if (minWidth) {
    if (window.innerWidth >= minWidth) {
      return <>{props.children}</>;
    } else {
      return <></>;
    }
  } else if (maxWidth) {
    if (window.innerWidth <= maxWidth) {
      return <>{props.children}</>;
    } else {
      return <></>;
    }
  }

  return <></>;
}
