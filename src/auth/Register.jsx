import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  checkIsLoggedIn,
} from "../CONSTANT";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (checkIsLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);
  const init__payload = {
    name: "",
    password: "",
    email: "",
  };
  const [payload, setPayload] = useState(init__payload);
  const changePayload = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const register = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();

    let allGood = true;

    if (!payload.name) {
      setMessage("Enter your name.", "danger");
      allGood = false;
    } else if (
      !payload.email ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email)
    ) {
      setMessage("Enter valid email.", "danger");
      allGood = false;
    } else if (!payload.password) {
      setMessage("Enter valid password.", "danger");
      allGood = false;
    }

    if (allGood) {
      await axios
        .post(CONSTANT.server + "authentication/user", payload)
        .then((responce) => {
          if (responce.data) {
            let res = responce.data;
            if (res.message) {
              setMessage("Ensure this field has at least 8 characters.", "danger");
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
    e.target.innerHTML = "Register";
  };
  return (
    <main className="d-flex justify-content-center align-items-center">
      <div className="w-50">
        <h1 className="text-center mb-5">Registration</h1>
        <form className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={payload.name}
              onChange={changePayload}
              required
            />
          </div>
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
              onChange={changePayload}
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
              onChange={changePayload}
              required
            />
          </div>
          <div className="text-center mt-4">
            <button onClick={register} className="btn btn-success w-100">
              Register
            </button>
          </div>
          <div className="my-3" id="error" style={{ display: "none" }}></div>
        </form>
      </div>
    </main>
  );
};

export default Register;
