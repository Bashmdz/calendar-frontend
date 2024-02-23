// Constants for server and client URLs
export const CONSTANT = {
  server: "https://calender-app-bashar-e84fae186fa8.herokuapp.com/", // CHANGE WITH YOUR BACKEND LINK (/ is MUST IN END)
  admin: "https://calender-app-bashar-e84fae186fa8.herokuapp.com/admin/", // CHANGE WITH YOUR BACKEND LINK (/ is MUST IN END)
  client: "http://localhost:5173/", // CHANGE WITH YOUR FRONTEND LINK (/ is MUST IN END).
};

// Brand name constant
export const BRAND_NAME = "CalenTask";

// Check if user is logged in
export const checkIsLoggedIn = () => {
  return sessionStorage.getItem("loggedin") &&
    JSON.parse(sessionStorage.getItem("loggedin")).data
    ? true
    : false;
};

// Generate error message
export const getErrorMessage = (message) => {
  let toReturn = "";
  for (const key in message) {
    toReturn += `[${capitalizeFirstLetter(key.split("_").join(" "))}]: ${
      message[key][0]
    }\n`;
  }
  return toReturn;
};

// Set error message
export const setMessage = (text, color) => {
  let error = document.getElementById("error");
  error.innerHTML = text;
  error.classList.add("text-" + color);
  error.style.display = "block";
};

// Reset error message
export const resetMessage = () => {
  let error = document.getElementById("error");
  error.innerText = "";
  error.style.display = "none";
  error.classList.remove("text-danger");
  error.classList.remove("text-success");
};

// Check if error message is displayed
export const isMessage = () => {
  let error = document.getElementById("error");
  if (error.style.display === "none") {
    return false;
  }
  return true;
};

// Capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
