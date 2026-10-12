import { useState } from "react";
import { Container, Navbar, Nav, NavLink as NavbarLink } from "react-bootstrap";
import { BoxArrowRight, PersonCircle } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import AuthContext from "../../store/auth-context";
import Modal from "../Modal";
import Profile from "../views/Profile";
import { authActions } from "../../store/redux/auth";
import Loader from "../Loader";
import { useMutation } from "@tanstack/react-query";
import fetchApi, { queryClient, setAuthToken } from "../../utilities/fetch-api";
import { notificationActions } from "../../store/redux/notification";

const Header = () => {
  // const { logout, authUser } = use(AuthContext);
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.auth);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: fetchApi,
    onSuccess: (data) => {
      setAuthToken(null);
      dispatch(authActions.logout());
      dispatch(notificationActions.send({ type: "success", title: "Logout", message: data?.success || "Logged-out successfully!"}));
      // queryClient.invalidateQueries({ refetchType: "none"});
      queryClient.setQueryData(["autoLogin"], null);
      navigate("/login");
    }
  });

  const logoutHandler = () => mutate({ url: "logout", method: "post"});

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
                <NavLink to="/" className="nav-link">Dashboard</NavLink>
                <NavLink to="/accounts" className="nav-link">Accounts</NavLink>
                <NavbarLink onClick={() => setShowProfile(true)} title={`${authUser.name || "User"}'s Profile`}>
                  <PersonCircle />
                </NavbarLink>
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
      {isPending && <Modal show={isPending} title="Logging Out"><Loader /></Modal>}
    </>
  );
};

export default Header;
