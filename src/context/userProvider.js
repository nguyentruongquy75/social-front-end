import React, { useState } from "react";

import userContext from "./userCtx";

export default function UserProvider(props) {
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");

  const value = {
    id,
    avatar,
    fullName,
    setId,
    setAvatar,
    setFullName,
  };

  return (
    <userContext.Provider value={value}>{props.children}</userContext.Provider>
  );
}
