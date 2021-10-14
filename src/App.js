import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";

import AuthContext from "./store/auth-context";
import Login from "./components/Login";
// import Register from "./components/Register";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Container fluid>
      {authCtx.isLoggedIn === false && <Login />}
      {authCtx.isLoggedIn === true && (
        <div className="text-success">
          Welcome {authCtx.loggedInUser.name}!
          <Button variant="primary" onClick={authCtx.logout}>
            Logout
          </Button><br />You have been LoggedIn Successfully!
        </div>
      )}
      {/* <div className="justify-content-md-center row">OR</div>
      {authCtx.isLoggedIn === false && <Register />} */}
    </Container>
  );
}

export default App;
