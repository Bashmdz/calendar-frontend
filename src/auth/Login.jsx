import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  checkIsLoggedIn,
  getErrorMessage,
} from "../CONSTANT";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (checkIsLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);
  const initialPayload = {
    email: "",
    password: "",
  };
  const [payload, setPayload] = useState(initialPayload);
  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();

    let allGood = true;

    if (!payload.email || !payload.password) {
      setMessage("Enter valid email and password.", "danger");
      allGood = false;
    }

    if (allGood) {
      await axios
        .post(CONSTANT.server + "authentication/validate", payload)
        .then((response) => {
          if (response.data) {
            let res = response.data;
            if (res.message) {
              setMessage(res.message, "danger");
            } else {
              sessionStorage.setItem(
                "loggedin",
                JSON.stringify({
                  data: res,
                })
              );
              navigate("/dashboard");
            }
          }
        })
        .catch((error) => {
          setMessage("System error!", "danger");
          console.log(error);
        });
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Login";
  };
  return (
    <main className="d-flex justify-content-center align-items-center">
      <div className="w-50">
        <h1 className="text-center mb-5">Login</h1>
        <form className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={payload.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={payload.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center mt-4">
            <button onClick={handleLogin} className="btn btn-success w-100">
              Login
            </button>
          </div>
          <div className="my-3" id="error" style={{ display: "none" }}></div>
        </form>
      </div>
    </main>
  );
};

export default Login;
