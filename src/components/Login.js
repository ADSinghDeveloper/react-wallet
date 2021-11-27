import React, { useReducer, useContext, useState } from "react";
import { Card, Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap";
import useApi from "../hooks/use-api";

import AuthContext from "../store/auth-context";
import validateEMail from "../helper/helper";

const formReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_VALIDATION":
      state = {
        ...state,
        email: {
          value: action.value,
          isValid: validateEMail(action.value),
          // isExists:
          //   validateEMail(action.value) && action.isEmailExists(action.value),
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
    isValid:
      state.email.isValid /*&& state.email.isExists*/ && state.password.isValid,
  };
};

const Login = () => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    email: { value: "", isValid: null, isExists: false },
    password: { value: "", isValid: null },
    stay_logged_in: { value: false },
    isValid: false,
  });
  const authCtx = useContext(AuthContext);
  const [loginResponse, setLoginResponse] = useState(null);
  const {isLoading, error, makeRequest: loginRequest} = useApi();
  let errorMsg = '';

  const clearLoginError = () => {
    setLoginResponse(null);
  }

  const emailFieldHandler = (event) => {
    // console.log(event.currentTarget.value);
    clearLoginError();
    formDispatcher({
      type: "EMAIL_VALIDATION",
      value: event.target.value,
      // isEmailExists: authCtx.isEmailExists
    });
  };

  const passwordFieldHandler = (event) => {
    clearLoginError();
    formDispatcher({ type: "PSW_VALIDATION", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoginResponse(null);

    formDispatcher({
      type: "EMAIL_VALIDATION",
      value: formState.email.value,
      // isEmailExists: authCtx.isEmailExists,
    });
    formDispatcher({ type: "PSW_VALIDATION", value: formState.password.value });
    // setLoading(true);

    if (formState.isValid) {
      let loginData = {
        email: formState.email.value,
        password: formState.password.value,
      };

      loginRequest({url: 'login', params: loginData}, (response) => {
        if (
          response.hasOwnProperty("user") &&
          typeof response.user != "undefined"
        ) {
          authCtx.setLoggedInData(
            true,
            response.user,
            response.access_token,
            response.token_type
          );
        }
      });
    }
  };

  if(error){
    errorMsg = error.code === 401 ? "Username/Password mismatched." : `${error.title} - ${error.message}` ;
  }

  return (
    <Row className="justify-content-md-center">
      <Col lg={3}>
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
                      ? formState.email.isValid //&& formState.email.isExists
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                  title={
                    formState.email.isValid != null
                      ? formState.email.isValid //&& formState.email.isExists
                        ? ""
                        : "Invalid Email"
                      : ""
                  }
                />
                <Form.Label>Email address</Form.Label>
                {/* {formState.email.isValid && !formState.email.isExists && (
                  <Form.Text className="text-danger">
                    Email not exists in our records.
                  </Form.Text>
                )} */}
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
              {loginResponse === false && (
                <Form.Text className="text-danger">
                  Incorrect Password. Please try again.
                </Form.Text>
              )}
              <Form.Group className="mt-4 text-center">
                {isLoading && !error && <Spinner animation="border" variant="primary" />}
                {!isLoading && (
                  <Button variant="primary" type="submit" className="w-100">
                    Log In
                  </Button>
                )}
              </Form.Group>
            </Form>
            {error && (
              <Alert variant="danger" className="mt-3">
                <small>{errorMsg}</small>
              </Alert>
            )}
            <hr />
            <div className="text-center">
            <Button variant="primary" onClick={authCtx.getRegister}>Create Your Wallet Account</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
