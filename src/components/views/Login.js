import React, { useReducer } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { NavLink /*, useHistory*/ } from "react-router-dom";

import useApi from "../../hooks/use-api";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import validateEMail from "../../helper/helper";
import AlertMsg from "../AlertMsg";
import CardLayout from "../layout/CardLayout";
import Loader from "../Loader";

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
  // const history = useHistory();
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

      loginRequest({ url: "login", type: 'post', params: loginData }, (response) => {
        if (
          response.hasOwnProperty("user") &&
          response.hasOwnProperty("access_token")
        ) {
          dispatch(
            authActions.setLoggedInData(response)
          );
          // history.push('/');
        }else{
          console.error('Server Response Error.');
        }
      });
    }
  };

  return (
    <CardLayout title="Login">
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
        <Form.Group className="mt-4">
          {isLoading && !alert.success && <Loader type="primary" />}
          {!isLoading && (
            <Button variant="primary" type="submit" className="w-100">Log In</Button>
          )}
        </Form.Group>
      </Form>
      <AlertMsg {...alert} />
      <hr />
      <Card.Text>
        Don't have an account? &nbsp;
        <NavLink to="/register" className="text-decoration-none">Create here.</NavLink>
      </Card.Text>
    </CardLayout>
  );
};

export default Login;
