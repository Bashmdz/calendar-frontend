import React from "react";

// Create a context for user data
const UserData = React.createContext({
  session: {
    personal: {
      id: "", // User ID
      email: "", // User email
      name: "", // User name
    },
    isLoggedIn: false, // User login status
  },
  setSession: () => {}, // Function to set user session
  setToast: () => {}, // Function to set toast message
});

export default UserData;
