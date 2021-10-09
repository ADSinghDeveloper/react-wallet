import { Container } from "react-bootstrap";

import { AuthContextProvider } from "./store/auth-context";
// import Login from "./components/login/login";
import Register from "./components/register/register";

function App() {
  return (
    <AuthContextProvider>
      <Container fluid>
        {/* <Login /> */}
        <Register />
      </Container>
    </AuthContextProvider>
  );
}

export default App;
