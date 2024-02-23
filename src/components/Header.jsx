import React from "react";
import { Link } from "react-router-dom";
import { BRAND_NAME } from "../CONSTANT";

// ListItem component
const ListItem = (props) => {
  if (props?.to) {
    return (
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to={props?.to || "/"}>
          {props?.label}
        </Link>
      </li>
    );
  }
  return (
    <li className="nav-item">
      <span
        className="text-danger nav-link"
        role="button"
        onClick={props?.onClick}
      >
        {props?.label}
      </span>
    </li>
  );
};

// Header component
const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Brand logo and name */}
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" style={{ width: "45px" }} alt="Logo" />
          <span className="ps-2">{BRAND_NAME}</span>
        </Link>
        {/* Navbar toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Navbar items */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            {props?.isLoggedIn ? (
              <>
                {/* User info */}
                <li className="nav-item d-flex align-items-center justify-content-center me-2">
                  <p className="text-muted m-0 p-0">
                    Signed in as <b>{props?.personal?.name || "Anonymous"}</b>
                  </p>
                </li>
                {/* Dashboard */}
                <ListItem label="Dashboard" to="/dashboard" />
                {/* Profile */}
                <ListItem label="Profile" to="/profile" />
                {/* Logout */}
                <ListItem label="Logout" onClick={props?.logout} />
              </>
            ) : (
              <>
                {/* Register */}
                <ListItem label="Register" to="/register" />
                {/* Sign In */}
                <ListItem label="Sign In" to="/signin" />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
