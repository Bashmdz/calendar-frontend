import React from "react";
import { Link } from "react-router-dom";

// Component for rendering the Not Found page
export default function NotFound() {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="col-md-6 text-center">
        <h1 className="display-4">404</h1> {/* Display the error code */}
        <p className="lead">Page Not Found</p> {/* Display the error message */}
        <Link to="/">Go Home</Link> {/* Link to the home page */}
      </div>
    </div>
  );
}
