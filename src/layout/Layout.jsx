import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";

export default function Layout(props) {
  let navigate = useNavigate();
  let location = useLocation();

  // Initialize session state
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

  // Check if user is logged in on page load
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

  // Redirect to signin page if user is not logged in
  useEffect(() => {
    if (!props?.auth && !session.isLoggedIn) {
      navigate("/signin");
    }
  }, [session]);

  // Logout function
  const logout = async () => {
    sessionStorage.removeItem("loggedin");
    setSession(__init_session);
    navigate("/signin");
  };

  return (
    <>
      {/* User Data Context Provider */}
      <Header
        isLoggedIn={session?.isLoggedIn}
        logout={logout}
        personal={session?.personal}
      />
      <div className="">{props.children}</div>
      <Footer />
      {/* Toast Notification */}
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        delay={3000}
        autohide
        className={`bg-${toast.type} toast-css text-white fixed-bottom m-3`}
      >
        <Toast.Body>{toast.text}</Toast.Body>
      </Toast>
    </>
  );
}
