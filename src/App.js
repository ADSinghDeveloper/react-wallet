import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import Layout from "./components/layout/Layout";
import { getAuthProfile } from "./store/auth";
// import MsgModal from "./components/MsgModal";
import Notification from "./components/Notification";

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
          <Redirect to="/" />
        </Switch>
      </Layout>
      )}
      {isLoggedIn === false && (
        <div className="auth-box">
          <Switch>
            <Route path="/login"><Login /></Route>
            <Route path="/register"><Register /></Route>
            <Redirect to="login" />
          </Switch>
        </div>
      )}
      <Notification />
      {/* <MsgModal /> */}
    </>
  );
}

export default App;
