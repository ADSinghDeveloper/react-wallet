// import React, { useContext } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
// import AuthContext from "../../store/auth-context";

const Login = () => {
  // const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    // authCtx.logout();
    // console.log('on submit'+ authCtx.isLoggedIn);
  }

  return (
    <Row className="justify-content-md-center">
      <Col lg={3}>
        <Card>
        <h3 className="card-header mb-4 fw-normal text-center text-primary">
            Login
          </h3>
          <Card.Body>
            {/* <Card.Title>Login</Card.Title> */}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-2 form-floating" controlId="loginEmail">
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Label>Email address</Form.Label>
                </Form.Group>
                <Form.Group className="mb-2 form-floating" controlId="loginPassword">
                  <Form.Control type="password" placeholder="Password" />
                  <Form.Label>Password</Form.Label>
                </Form.Group>
                <Form.Group className="mb-2 form-floating" controlId="stayLogin">
                  <Form.Check type="checkbox" label="Stay LoggedIn" />
                </Form.Group>
              <Form.Group className="mt-4 text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="mb-4 w-100"
                >
                  Login
                </Button>
              </Form.Group>
              </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
