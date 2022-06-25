import React, { Fragment } from "react";
import { Row, Container, Col } from "react-bootstrap";
import Header from "./Header";

const Layout = (props) => {

  return (
    <Fragment>
      <Header />
      <Container>
        <Row>
          <Col lg={12} className="my-3">{props.children}</Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Layout;
