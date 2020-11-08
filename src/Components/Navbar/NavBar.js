import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Form } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "@material-ui/core";
const Styles = styled.div`
  .navbar {
    background-color: #bbb;
  }

  .navbar-nav,
  .home-link,
  about-link,
  bookcase-link {
    color: #bbb;
  }

  &:hover {
    color: white;
  }
`;

export const NavBar = ({ keyword, findBooks, setKeyword }) => {
  return (
    <Styles>
      <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link to="/" className="home-link">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/about" className="about-link">
                About
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/bookcase" className="bookcase-link">
                Bookcase
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};

export default NavBar;
