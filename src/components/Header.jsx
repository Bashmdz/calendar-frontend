import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#register">Register</Nav.Link>
          <Nav.Link href="#signIn">Sign In</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
