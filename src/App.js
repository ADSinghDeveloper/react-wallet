import { use, useEffect } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";

import AuthContext from "./store/auth-context";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import Layout from "./components/layout/Layout";
import Notification from "./components/Notification";
import { Col, Row } from "react-bootstrap";
import { getLocalAuthKey } from "./helper/helper";
import useApi from "./hooks/use-api";
import Loader from "./components/Loader";

function App() {
  const { isLoggedIn, setLoggedInData } = use(AuthContext);
  const { isLoading, makeRequest: authProfileRequest } = useApi();

  useEffect(() => {
    const localAuthKey = getLocalAuthKey();
    // Logged-in users can reload the browser manually and get login again automatically with their last used authorization API key.
    // This feature added, just to try if app do not work as expected and user need to reload the whole app/page.
    // This is also just for practise useEffect hook.
    if (localAuthKey?.access_token && !isLoggedIn) {
      authProfileRequest(
        {
          url: "profile",
          ...localAuthKey,
        },
        (response) => {
          setLoggedInData({user: {...response}, ...localAuthKey});
        },
      );
    }
  }, [isLoggedIn, authProfileRequest, setLoggedInData]);

  return (
    <>
      {isLoggedIn ? (
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
      ) : ( isLoading ? <div className="center-box"><Loader /></div> :
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
