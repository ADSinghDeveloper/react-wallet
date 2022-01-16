import React from "react";
import { Container} from "react-bootstrap";
import { useSelector } from "react-redux";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
// import MsgModal from "./components/MsgModal";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const signUp = useSelector(state => state.signUp);

  return (
    <Container fluid>
      {!isLoggedIn && !signUp && <Login />}
      {!isLoggedIn && signUp && <Register />}
      {isLoggedIn && <Dashboard />}
      {/* <MsgModal /> */}
    </Container>
  );
}

export default App;
