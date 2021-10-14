import React, { useReducer, useContext, useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
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
          isExists:
            validateEMail(action.value) && action.isEmailExists(action.value),
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
    default:
      throw new Error("Action type is required.");
  }
  return {
    ...state,
    isValid:
      state.email.isValid && state.email.isExists && state.password.isValid,
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

  const clearLoginError = () => {
    setLoginResponse(null);
  }

  const emailFieldHandler = (event) => {
    clearLoginError();
    formDispatcher({
      type: "EMAIL_VALIDATION",
      value: event.target.value,
      isEmailExists: authCtx.isEmailExists
    });
  };

  const passwordFieldHandler = (event) => {
    clearLoginError();
    formDispatcher({ type: "PSW_VALIDATION", value: event.target.value });
  };

  const submitHandler = (event) => {
    setLoginResponse(null);
    event.preventDefault();
    formDispatcher({ type: "EMAIL_VALIDATION", value: formState.email.value, isEmailExists: authCtx.isEmailExists });
    formDispatcher({ type: "PSW_VALIDATION", value: formState.password.value });

    if (formState.isValid) {
      let loginData = {email: formState.email.value, password: formState.password.value};
      setLoginResponse(authCtx.login(loginData));
    }
  };

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
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formState.email.value}
                  onChange={emailFieldHandler}
                  onBlur={emailFieldHandler}
                  className={
                    formState.email.isValid != null
                      ? formState.email.isValid && formState.email.isExists
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                />
                <Form.Label>Email address</Form.Label>
                {formState.email.isValid && !formState.email.isExists && <Form.Text className="text-danger">Email not exists in our records.</Form.Text>}
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
                {loginResponse === false && <Form.Text className="text-danger">Incorrect Password. Please try again.</Form.Text>}
              <Form.Group className="mt-4 text-center">
                <Button variant="primary" type="submit" className="mb-4 w-100">
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
