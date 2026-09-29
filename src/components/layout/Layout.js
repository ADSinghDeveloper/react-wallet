import { Row, Container, Col } from "react-bootstrap";
import Header from "./Header";
import { useSelector } from "react-redux";
import Notification from "../Notification";

const Layout = ({children}) => {
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
