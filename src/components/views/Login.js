import React, { useReducer } from "react";
import { Card, Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap";
import useApi from "../../hooks/use-api";

import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import validateEMail from "../../helper/helper";

const formReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_VALIDATION":
      state = {
        ...state,
        email: {
          value: action.value,
          isValid: validateEMail(action.value),
        },
      };
      break;
    case "PSW_VALIDATION":
      state = {
        ...state,
        password: {
          value: action.value.trim(),
          isValid: action.value.trim().length > 5,
        },
      };
      break;
    default:
      throw new Error("Action type is required.");
  }
  return {
    ...state,
    isValid: state.email.isValid && state.password.isValid,
  };
};

const Login = () => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    email: { value: "", isValid: null, isExists: false },
    password: { value: "", isValid: null },
    stay_logged_in: { value: false },
    isValid: false,
  });
  const dispatch = useDispatch();
  const { isLoading, alert, makeRequest: loginRequest } = useApi();

  const emailFieldHandler = (event) => {
    formDispatcher({
      type: "EMAIL_VALIDATION",
      value: event.target.value,
    });
  };

  const passwordFieldHandler = (event) => {
    formDispatcher({ type: "PSW_VALIDATION", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    formDispatcher({
      type: "EMAIL_VALIDATION",
      value: formState.email.value,
    });
    formDispatcher({ type: "PSW_VALIDATION", value: formState.password.value });

    if (formState.isValid) {
      let loginData = {
        email: formState.email.value,
        password: formState.password.value,
      };

      loginRequest({ url: "login", params: loginData }, (response) => {
        if (
          response.hasOwnProperty("user") &&
          typeof response.user != "undefined"
        ) {
          dispatch(
            authActions.setLoggedInData({
              login_status: true,
              user: response.user,
              token: response.access_token,
              token_type: response.token_type,
            })
          );
        }
      });
    }
  };

  const registerHandler = () => {
    dispatch(authActions.toRegister());
  }

  return (
    <Row className="justify-content-md-center">
      <Col lg={12}>
        <Card>
          <h3 className="card-header mb-4 fw-normal text-center text-primary">
            Wallet LogIn
          </h3>
          <Card.Body className="pb-4">
            {/* <Card.Title>Login</Card.Title> */}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-2 form-floating" controlId="loginEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formState.email.value}
                  onChange={emailFieldHandler}
                  onBlur={emailFieldHandler}
                  className={
                    formState.email.isValid != null
                      ? formState.email.isValid
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                  title={
                    formState.email.isValid != null
                      ? formState.email.isValid
                        ? ""
                        : "Invalid Email"
                      : ""
                  }
                />
                <Form.Label>Email address</Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-2 form-floating"
                controlId="loginPassword"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formState.password.value}
                  onChange={passwordFieldHandler}
                  onBlur={passwordFieldHandler}
                  className={
                    formState.password.isValid != null
                      ? formState.password.isValid
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
              {/* <Form.Group className="mb-2 form-floating" controlId="stayLogin">
                <Form.Check type="checkbox" label="Stay LoggedIn" />
              </Form.Group> */}
              <Form.Group className="mt-4 text-center">
                {isLoading && !alert.success && (
                  <Spinner animation="border" variant="primary" />
                )}
                {!isLoading && (
                  <Button variant="primary" type="submit" className="w-100">
                    Log In
                  </Button>
                )}
              </Form.Group>
            </Form>
            {!alert.success && alert.error && (
              <Alert variant="danger" className="mt-3">
                {alert.error}
              </Alert>
            )}
            <hr />
            <div className="text-center">
              <Button
                variant="link"
                className="text-decoration-none"
                disabled={isLoading}
                onClick={registerHandler}
              >
                Create Your Wallet Account
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;