import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AccountContext } from "../Account";
const HeaderPage = () => {
  const { getSession, logout } = useContext(AccountContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  console.log("GETSESSION HEADER: ", getSession);
  useEffect(() => {
    console.log("Status useEffect");
    getSession().then((session) => {
      console.log("Session:", session);
      setUserLoggedIn(true);
    });
  }, [getSession]);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">WAR Automation</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!userLoggedIn ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">SignUp</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/setting">Setting</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderPage;
