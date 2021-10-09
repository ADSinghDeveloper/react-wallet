import React from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";

const Login = () => {

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('on submit');
  }

  return (
    <Row className="justify-content-md-center" style={{marginTop: "12vh"}}>
      <Col lg={3}>
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="stayLogin">
                  <Form.Check type="checkbox" label="Stay LoggedIn" />
                </Form.Group>
                <Button variant="primary" type="submit" >
                  Submit
                </Button>
              </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
