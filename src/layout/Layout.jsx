import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserData from "../contexts/UserData";
import { checkIsLoggedIn } from "../CONSTANT";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";

export default function Layout(props) {
  let navigate = useNavigate();
  let location = useLocation();
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
  const [toast, setToast] = useState({ show: false, text: "", type: "" });

  useEffect(() => {
    let sessionData = JSON.parse(sessionStorage.getItem("loggedin"));
    if (sessionData) {
      setSession({
        ...__init_session,
        personal: sessionData.data,
        isLoggedIn: true,
      });
    }
  }, [location]);

  const value = { session, setSession, setToast };

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
    setSession(__init_session);
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
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          delay={3000}
          autohide
          className={`bg-${toast.type} toast-css text-white fixed-bottom m-3`}
        >
          <Toast.Body>{toast.text}</Toast.Body>
        </Toast>
      </UserData.Provider>
    </>
  );
}
