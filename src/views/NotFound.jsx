import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="col-md-6 text-center">
        <h1 className="display-4">404</h1>
        <p className="lead">Page Not Found</p>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
}
