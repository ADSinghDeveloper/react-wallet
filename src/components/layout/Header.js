import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
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

  const goToProfileHandler = () => {
    dispatch(authActions.toProfile());
  };

  const goToDashboardHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.toDashboard());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as="a" href="#" onClick={goToDashboardHandler}>
          Wallet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <NavDropdown title={authUserName} id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={goToProfileHandler}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
