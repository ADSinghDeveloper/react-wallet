import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

// import useApi from "./hooks/use-api";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import Layout from "./components/layout/Layout";
// import { authActions } from "./store/auth";
// import { getLocalAuthKey, removeLocalAuthKey } from "./helper/helper";
import Notification from "./components/Notification";
import Colors from "./components/views/Colors";
import { Col, Row } from "react-bootstrap";
// import Loader from "./components/Loader";
import PageNotFound from "./components/views/PageNotFound";
// import { useEffect } from "react";

// let checkUserKey = true;

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRootUser = useSelector((state) => state.auth.isRootUser);
  // const isAppLoaded = useSelector((state) => state.auth.isAppLoaded);
  // const { makeRequest: authProfileRequest } = useApi();
  // const dispatch = useDispatch();

  /*useEffect(() => {
    const localAuthKey = getLocalAuthKey();
    if (localAuthKey && !isAppLoaded && !isLoggedIn) {
      authProfileRequest(
        {
          url: "profile",
          token: localAuthKey.token,
          token_type: localAuthKey.type,
        },
        (response) => {
          console.log('response',response);
          if (typeof response === "object") {
            dispatch(
              authActions.setLoggedInData({
                user: response,
                access_token: localAuthKey.token,
                token_type: localAuthKey.type,
                appLoaded: true,
              }),
            );
          } else {
            console.error("Auth Profile Error.");
            removeLocalAuthKey();
          }
        },
      );
    } else {
      dispatch(authActions.logout());
    }
  },[isLoggedIn,isAppLoaded,authProfileRequest,dispatch]);*/

  return (
    <>
      {isLoggedIn && (
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/colors">
              {isRootUser ? <Colors /> : <PageNotFound />}
            </Route>
            {/* <Route path="*"><PageNotFound /></Route> */}
            <Redirect to="/" />
          </Switch>
        </Layout>
      )}
      {/*!isAppLoaded && isLoggedIn === null && (
        <div className="center-box">
          <Loader />
        </div>
      )*/}
      {!isLoggedIn && (
        <div className="center-box">
          <Row>
            <Col lg={12}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
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
