import React, { useContext } from "react";
import { Container } from "react-bootstrap";

import AuthContext, { AuthContextProvider } from "./store/auth-context";
// import Login from "./components/login/login";
import Register from "./components/register/register";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <Container fluid>
        {/* {authCtx.isLoggedIn === false && <Login />} */}
        {authCtx.isLoggedIn === false && <Register />}
      </Container>
    </AuthContextProvider>
  );
}

export default App;
