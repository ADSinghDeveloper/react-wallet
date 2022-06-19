import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import Layout from "./components/layout/Layout";
import { getAuthProfile } from "./store/auth";
import Notification from "./components/Notification";
import Colors from "./components/views/Colors";
import { Col, Row } from "react-bootstrap";
import Loader from "./components/Loader";

let checkUserKey = true;

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  if (checkUserKey && !isLoggedIn) {
    dispatch(getAuthProfile());
    checkUserKey = false;
  }

  return (
    <>
      {isLoggedIn && (<Layout>
        <Switch>
          <Route path="/" exact><Dashboard /></Route>
          <Route path="/profile"><Profile /></Route>
          <Route path="/colors"><Colors /></Route>
          <Redirect to="/" />
        </Switch>
      </Layout>
      )}
      {isLoggedIn === null && <div className="auth-box"><Loader /></div>}
      {isLoggedIn === false && (
        <div className="auth-box">
          <Row className="justify-content-center">
            <Col lg={12}>
              <Switch>
                <Route path="/login"><Login /></Route>
                <Route path="/register"><Register /></Route>
                <Redirect to="login" />
              </Switch>
            </Col>
          </Row>
        </div>
      )}
      <Notification />
    </>
  );
}

export default App;
