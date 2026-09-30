import { useState } from "react";
import { Container, Navbar, Nav, NavLink as NavbarLink } from "react-bootstrap";
import { BoxArrowRight, PersonCircle } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import AuthContext from "../../store/auth-context";
import Modal from "../Modal";
import Profile from "../views/Profile";
import useApi from "../../hooks/use-api";
import { authActions } from "../../store/redux/auth";
import Loader from "../Loader";

const Header = () => {
  // const { logout, authUser } = use(AuthContext);
  const dispatch = useDispatch();
  const authUser = useSelector(store => store.auth.authUser);
  const [showProfile, setShowProfile] = useState(false);
  const {makeRequest: logoutRequest, isLoading} = useApi();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutRequest({url: "logout", method: "post"}, () => {
        // logout();
        dispatch(authActions.logout());
        navigate("/login");
      });
  };

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
            <NavLink to="/" end className="navbar-brand fw-medium">
              Wallet
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
                <NavbarLink onClick={() => setShowProfile(true)} title={`${authUser.name || "User"}'s Profile`}>
                  <PersonCircle />
                </NavbarLink>
                <NavLink to="/accounts" className="nav-link">Accounts</NavLink>
                <NavbarLink onClick={logoutHandler}>
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
      {showProfile && <Modal
        show={showProfile}
        onClose={() => setShowProfile(false)}
        title="Profile"
      >
        <Profile onClose={() => setShowProfile(false)} />
      </Modal>}
      {isLoading && <Modal show={isLoading} title="Logging Out"><Loader /></Modal>}
    </>
  );
};

export default Header;
