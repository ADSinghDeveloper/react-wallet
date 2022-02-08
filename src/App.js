import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import Layout from "./components/layout/Layout";
import { getAuthProfile } from "./store/auth";
import { Row, Spinner } from "react-bootstrap";
// import MsgModal from "./components/MsgModal";
import Notification from "./components/Notification";

let checkUserKey = true;

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const signUp = useSelector((state) => state.auth.signUp);
  const profilePage = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  if (checkUserKey && !isLoggedIn) {
    dispatch(getAuthProfile());
    checkUserKey = false;
  }

  return (
    <>
      {isLoggedIn == null && (
        <div className="auth-box text-center">
          <Row className="justify-content-md-center">
            <Spinner animation="grow" variant="dark" />
          </Row>
        </div>
      )}
      {isLoggedIn && (
        <Layout>
          {!profilePage && <Dashboard />}
          {profilePage && <Profile />}
        </Layout>
      )}
      {isLoggedIn === false && (
        <div className="auth-box">
          {!signUp && <Login />}
          {signUp && <Register />}
        </div>
      )}
      <Notification />
      {/* <MsgModal /> */}
    </>
  );
}

export default App;
