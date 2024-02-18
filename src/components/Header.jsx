import React from "react";
import { Link } from "react-router-dom";

const ListItem = (props) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" aria-current="page" to={props?.to || "/"}>
        {props?.label}
      </Link>
    </li>
  );
};

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Calendar App
        </Link>
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
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <ListItem label="Register" to="/register"/>
            <ListItem label="Sign In" to="/signin"/>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
