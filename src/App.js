import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";

import AuthContext from "./store/auth-context";
import Login from "./components/Login/Login";
// import Register from "./components/Register/Register";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Container fluid>
      {authCtx.isLoggedIn === false && <Login />}
      {authCtx.isLoggedIn === true && (
        <div className="text-success">
          LoggedIn Successfully!
          <Button variant="primary" onClick={authCtx.logout}>
            Logout
          </Button>
        </div>
      )}
      {/* {authCtx.isLoggedIn === false && <Register />} */}
    </Container>
  );
}

export default App;
