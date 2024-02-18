import React from "react";
import { Container } from "react-bootstrap";
import { BRAND_NAME, CONSTANT } from "../CONSTANT";

const Footer = () => {
  return (
    <footer className="text-center my-3">
      <Container>
        © {new Date().getFullYear()} {BRAND_NAME}
      </Container>
    </footer>
  );
};

export default Footer;
