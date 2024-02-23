import React from "react";
import { Container } from "react-bootstrap";
import { BRAND_NAME } from "../CONSTANT";

// Footer component
const Footer = () => {
  return (
    // Footer section
    <footer className="text-center my-3">
      <Container>
        {/* Copyright notice */}© {new Date().getFullYear()} {BRAND_NAME}
      </Container>
    </footer>
  );
};

export default Footer;
