import React from "react";
import { Container } from "react-bootstrap";
import { BRAND_NAME } from "./../CONSTANT";

const Home = () => {
  return (
    // Container for the home page
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#636365",
        padding: "20px",
        height: "calc(100vh - 8rem)",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <div className="bg-white p-5 rounded-3 w-50 __HOME__BOX__">
          <h1 className="text-center mb-4 display-4">
            Welcome to {BRAND_NAME}
          </h1>
          <p
            className="text-center text-body text-muted"
            style={{
              fontSize: "1.2rem",
            }}
          >
            Your solution for managing tasks efficiently. Keep track of your
            meetings, appointments, and to-do lists all in one intuitive
            calendar interface. Stay organized, stay on top of your schedule,
            and never miss an important date again!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Home;
