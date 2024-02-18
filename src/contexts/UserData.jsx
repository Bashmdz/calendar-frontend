import React from "react";

const UserData = React.createContext({
  session: {
    personal: {
      id: "",
      email: "",
      name: "",
    },
    isLoggedIn: false,
  },
  setSession: () => {},
});

export default UserData;