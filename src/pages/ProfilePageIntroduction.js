import React from "react";
import ProfileIntroduction from "../components/profile/ProfileIntroduction";

export default function ProfilePageIntroduction(props) {
  return (
    <div>
      <ProfileIntroduction user={props.user} />
    </div>
  );
}
