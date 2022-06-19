import React, { Fragment } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Header from "./Header";

const Layout = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>
      {isLoggedIn && <><Header />
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={12} className="main-content">{props.children}</Col>
        </Row>
      </Container></>}
      {isLoggedIn == null && (
        <div className="auth-box text-center">
          <Loader />
        </div>
      )}
    </Fragment>
  );
};

export default Layout;
