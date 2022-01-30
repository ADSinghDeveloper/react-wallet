import React from "react";
import { Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./Header";

const Layout = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn && <Header />}
      <Container>
        <Col lg={12} className="main-content">{props.children}</Col>
      </Container>
    </>
  );
};

export default Layout;
