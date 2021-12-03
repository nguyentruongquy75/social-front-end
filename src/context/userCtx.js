import { createContext } from "react";

const userContext = createContext({
  id: "",
  avatar: "",
  fullName: "",
  setId(id) {},
  setAvatar(avatar) {},
  setFullName(fullName) {},
});

export default userContext;
