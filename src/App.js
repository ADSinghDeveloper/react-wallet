import { useContext } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";

import AuthContext from "./store/auth-context";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import Layout from "./components/layout/Layout";
import Notification from "./components/Notification";
import { Col, Row } from "react-bootstrap";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && (
        <Layout>
          <HashRouter>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            {/* <Route path="*"><PageNotFound /></Route> */}
            <Redirect to="/" />
          </HashRouter>
        </Layout>
      )}
      {!isLoggedIn && (
        <div className="center-box">
          <Row>
            <Col lg={12}>
              <HashRouter>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Redirect to="login" />
              </HashRouter>
            </Col>
          </Row>
        </div>
      )}
      <Notification />
    </>
  );
}

export default App;
