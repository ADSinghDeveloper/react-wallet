import React, { useReducer, useState } from "react";
import { Card, Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap";

import { authActions } from "../store/redux";
import useApi from "../hooks/use-api";
import validateEMail from "../helper/helper";
import { useDispatch } from "react-redux";

const formReducer = (state, action) => {
  switch (action.type) {
    case "NAME_VALIDATION":
      state = {
        ...state,
        name: {
          value: action.value,
          isValid: action.value.trim().length > 2,
        },
      };
      break;
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
          isValid: action.value.trim().length > 7,
        },
      };
      break;
    case "CPSW_VALIDATION":
      state = {
        ...state,
        cpassword: {
          value: action.value,
          isValid:
            state.password.isValid === true &&
            state.password.value === action.value,
        },
      };
      break;
    default:
      throw new Error("Action type is required.");
  }
  return {
    ...state,
    isValid:
      state.name.isValid &&
      state.email.isValid &&
      state.password.isValid &&
      state.cpassword.isValid,
  };
};

const Register = () => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    name: { value: "", isValid: null },
    email: { value: "", isValid: null },
    password: { value: "", isValid: null },
    cpassword: { value: "", isValid: null },
    isValid: false,
  });

  const regSuccess = false;
  const dispatch = useDispatch();
  const { isLoading, error, makeRequest: registerRequest } = useApi();
  const [emailError, setEmailError] = useState(null);

  const nameHandler = (event) => {
    formDispatcher({ type: "NAME_VALIDATION", value: event.target.value });
  };

  const emailHandler = (event) => {
    formDispatcher({
      type: "EMAIL_VALIDATION",
      value: event.target.value,
    });
    setEmailError(false);
  };

  const passwordHandler = (event) => {
    formDispatcher({ type: "PSW_VALIDATION", value: event.target.value });
  };

  const cpasswordHandler = (event) => {
    formDispatcher({ type: "CPSW_VALIDATION", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmailError(false);
    formDispatcher({ type: "NAME_VALIDATION", value: formState.name.value });
    formDispatcher({
      type: "EMAIL_VALIDATION",
      value: formState.email.value,
    });
    formDispatcher({ type: "PSW_VALIDATION", value: formState.password.value });
    formDispatcher({
      type: "CPSW_VALIDATION",
      value: formState.cpassword.value,
    });

    if (formState.isValid) {
      let regData = {
        name: formState.name.value,
        email: formState.email.value,
        password: formState.password.value,
      };
      registerRequest(
        { url: "register", type: "post", params: regData },
        (response) => {
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
          } else {
            if (response.hasOwnProperty("email")) {
              setEmailError(response.email);
            } else {
              console.warn(response);
            }
          }
        }
      );
    }
  };

  const loginHandler = () => {
    dispatch(authActions.toLogin());
  }

  return (
    <Row className="justify-content-md-center">
      <Col lg={3}>
        <Card>
          <h3 className="card-header mb-3 fw-normal text-center text-primary">
            Wallet
          </h3>
          <Card.Body className="pb-4">
            <Card.Title className="h3 mb-3 fw-normal text-center">
              Create Your Wallet Account
            </Card.Title>
            {!regSuccess && (
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-2 form-floating" controlId="name">
                  <Form.Control
                    placeholder="Enter Your Name"
                    value={formState.name.value}
                    onChange={nameHandler}
                    onBlur={nameHandler}
                    className={
                      formState.name.isValid != null
                        ? formState.name.isValid
                          ? "is-valid"
                          : "is-invalid"
                        : ""
                    }
                  />
                  <Form.Label>Name</Form.Label>
                </Form.Group>
                <Form.Group className="mb-2 form-floating" controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={formState.email.value}
                    className={
                      formState.email.isValid != null || emailError
                        ? formState.email.isValid && !emailError
                          ? "is-valid"
                          : "is-invalid"
                        : ""
                    }
                    onChange={emailHandler}
                    onBlur={emailHandler}
                  />
                  <Form.Label>Email address</Form.Label>
                  {emailError && (
                    <Form.Text className="text-danger">{emailError}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-2 form-floating" controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formState.password.value}
                    className={
                      formState.password.isValid != null
                        ? formState.password.isValid
                          ? "is-valid"
                          : "is-invalid"
                        : ""
                    }
                    onChange={passwordHandler}
                    onBlur={passwordHandler}
                  />
                  <Form.Label>Password</Form.Label>
                </Form.Group>
                <Form.Group
                  className="mb-2 form-floating"
                  controlId="confirm_password"
                >
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={formState.cpassword.value}
                    className={
                      formState.cpassword.isValid != null
                        ? formState.cpassword.isValid
                          ? "is-valid"
                          : "is-invalid"
                        : ""
                    }
                    onChange={cpasswordHandler}
                    onBlur={cpasswordHandler}
                  />
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Text className="text-muted">
                    Minimum password length is 8 characters.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mt-4 pb-3 text-center">
                  {isLoading && !error && (
                    <Spinner animation="border" variant="primary" />
                  )}
                  {!isLoading && (
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      // disabled={!formState.isValid}
                    >
                      Create Account
                    </Button>
                  )}
                </Form.Group>
              </Form>
            )}
            {error && (
              <Alert variant="danger">
                <p>{error.title}</p>
                <small>{error.message}</small>
              </Alert>
            )}
            {regSuccess && (
              <div className="alert alert-success" role="alert">
                You have been registered successfully.
              </div>
            )}
            <Card.Text className="text-center">
              Have an account? <br />
              <Button
                variant="link"
                disabled={isLoading}
                onClick={loginHandler}
                className="text-decoration-none"
              >
                Login
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
