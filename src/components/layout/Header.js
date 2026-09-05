import { useContext, useState } from "react";
import { Container, Navbar, Nav, NavLink as NavbarLink } from "react-bootstrap";
import { BoxArrowRight, PersonCircle } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import Modal from "../Modal";
import Profile from "../views/Profile";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow"
      >
        <Container>
          <Navbar.Brand as="span">
            <NavLink to="/" className="navbar-brand fw-medium">
              Wallet
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
                <NavbarLink href="#"
                  onClick={() => setShowProfile(true)}
                >
                  <PersonCircle />
                </NavbarLink>
                <NavbarLink href="#" onClick={logout} className="nav-link">
                  <BoxArrowRight />
                </NavbarLink>
                {/* <NavLink to="/" exact className="nav-link">Dashboard</NavLink> */}
                {/* <NavLink to="/profile" className="dropdown-item">{authUserName}</NavLink> */}
              {/* <NavDropdown
                title={<PersonCircle />}
                id="collasible-nav-dropdown"
                >
                <NavDropdown.Item onClick={() => setShowProfile(true)}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        show={showProfile}
        onClose={() => setShowProfile(false)}
        title="Profile"
      >
        <Profile onClose={() => setShowProfile(false)} />
      </Modal>
    </>
  );
};

export default Header;
