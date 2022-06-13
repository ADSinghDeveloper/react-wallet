import React from "react";
import { Container, Navbar, Nav, NavItem } from "react-bootstrap"; //NavDropdown,
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { authActions } from "../../store/auth";
import useApi from "../../hooks/use-api";

const Header = () => {
  const dispatch = useDispatch();
  const authUserName = useSelector((state) => state.auth.authUser.name);
  const { makeRequest: logoutRequest } = useApi();

  const logoutHandler = () => {
    logoutRequest({url: "logout",type: "post"}, (response) => {
        dispatch(authActions.logout());
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as="span">
          <NavLink to="/" className="navbar-brand">Wallet</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <NavLink to="/profile" className="nav-link">{authUserName}</NavLink>
            <NavItem onClick={logoutHandler} className="nav-link">Logout</NavItem>
            {/* <NavDropdown title={authUserName} id="collasible-nav-dropdown">
              <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
