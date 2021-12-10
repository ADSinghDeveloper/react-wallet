import React, { useContext } from "react";
import { Container} from "react-bootstrap";

import AuthContext from "./store/auth-context";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
// import MsgModal from "./components/MsgModal";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Container fluid>
      {!authCtx.isLoggedIn && !authCtx.signUp && <Login />}
      {authCtx.isLoggedIn && <Dashboard />}
      {/* <MsgModal /> */}
      {!authCtx.isLoggedIn && authCtx.signUp && <Register />}
    </Container>
  );
}

export default App;
