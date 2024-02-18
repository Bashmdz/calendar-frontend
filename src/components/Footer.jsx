import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="text-center my-3">
      <Container>© {new Date().getFullYear()} Calendar App</Container>
    </footer>
  );
};

export default Footer;
