import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserData from "../contexts/UserData";
import { checkIsLoggedIn } from "../CONSTANT";
import { useNavigate } from "react-router-dom";
export default function Layout(props) {
  let navigate = useNavigate();
  // ------------------
  // SESSION - END
  // ------------------
  let __init_session = {
    personal: {
      id: "",
      email: "",
      name: "",
    },
    isLoggedIn: false,
  };
  const [session, setSession] = useState(__init_session);

  useEffect(() => {
    let sessionData = JSON.parse(sessionStorage.getItem("loggedin"));
    if (sessionData) {
      setSession({
        ...__init_session,
        personal: sessionData.data,
        isLoggedIn: true,
      });
    }
  }, []);

  const value = { session, setSession };
  // ------------------
  // SESSION - END
  // ------------------

  useEffect(() => {
    if (!props?.auth && !checkIsLoggedIn()) {
      navigate("/signin");
    }
  }, [session]);

  const logout = async () => {
    sessionStorage.removeItem("loggedin");
    props.setSession(props.__init_session);
    navigate("/signin");
  };

  return (
    <>
      <UserData.Provider value={value}>
        <Header
          isLoggedIn={session?.isLoggedIn}
          logout={logout}
          personal={session?.personal}
        />
        <div className="">{props.children}</div>
        <Footer />
      </UserData.Provider>
    </>
  );
}
