import React, { useContext, useEffect, useState } from "react";

import userContext from "../../context/userCtx";
import { Navigate } from "react-router-dom";
import { API_user } from "../../config";
import socket from "../../socket";

export default function PrivateRoute(props) {
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(userContext);
  const userId = localStorage.getItem("user");
  useEffect(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_user + "/" + userId);
      const user = await response.json();
      context.setId(user._id);
      context.setAvatar(user.avatar);
      context.setFullName(user.fullName);

      socket.emit("online", userId);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  if (localStorage.getItem("user")) {
    return <>{!isLoading && props.children}</>;
  }

  return <Navigate to="/auth/login" replace={true} />;
}
