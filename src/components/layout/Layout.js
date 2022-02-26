import React, { Fragment } from "react";
import { Row, Spinner, Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./Header";

const Layout = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>
      {isLoggedIn && <Header />}
      <Container>
        <Col lg={12} className="main-content">{props.children}</Col>
      </Container>
      {isLoggedIn == null && (
        <div className="auth-box text-center">
          <Row className="justify-content-md-center">
            <Spinner animation="grow" variant="dark" />
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default Layout;
