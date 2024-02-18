export const CONSTANT = {
  server: "http://127.0.0.1:8000/", // CHANGE WITH YOUR BACKEND LINK (/ is MUST IN END)
  admin: "http://127.0.0.1:8000/admin/", // CHANGE WITH YOUR BACKEND LINK (/ is MUST IN END)
  client: "http://localhost:5173/", // CHANGE WITH YOUR FRONTEND LINK (/ is MUST IN END)
};

export const checkLoginFromLogin = () => {
  return sessionStorage.getItem("loggedin") &&
    JSON.parse(sessionStorage.getItem("loggedin")).data
    ? true
    : false;
};

export const checkLoginFromNonLogin = () => {
  return sessionStorage.getItem("loggedin") &&
    JSON.parse(sessionStorage.getItem("loggedin")).data
    ? false
    : true;
};
