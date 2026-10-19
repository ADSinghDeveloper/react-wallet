// import { use } from "react";
import { Row, Container, Col } from "react-bootstrap";
import Header from "./Header";
// import AuthContext from "../../store/auth-context";
import { useSelector } from "react-redux";
import Notification from "../Notification";

const Layout = ({children}) => {
  // const { isLoggedIn } = use(AuthContext);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn && <Header />}
      <Container>
        <Row className={`${!isLoggedIn ? 'center-box' : ''}`}>
          <Col lg={12} className="my-3">
            {children}
          </Col>
        </Row>
      </Container>
      <Notification />
    </>
  );
};

export default Layout;
