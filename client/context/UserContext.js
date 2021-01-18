import { createContext } from "react";

const userHook = [
  {
    name: "",
    email: "",
    password: "",
    loggedIn: false,
    lastLogin: ""
  },
  () => {}
];

const UserContext = createContext(userHook);

export default UserContext;
