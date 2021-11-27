import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";

import AuthContext from "./store/auth-context";
import Login from "./components/Login";
import Register from "./components/Register";
// import MsgModal from "./components/MsgModal";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Container fluid>
      {!authCtx.isLoggedIn && !authCtx.signUp && <Login />}
      {authCtx.isLoggedIn && (
        <div className="text-success">
          Welcome {authCtx.authUser.name}!
          <br />
          You have been LoggedIn Successfully!<br />
          <Button variant="primary" onClick={authCtx.logout}>
            Logout
          </Button>
        </div>
      )}
      {/* <MsgModal /> */}
      {!authCtx.isLoggedIn && authCtx.signUp && <Register />}
    </Container>
  );
}

export default App;
