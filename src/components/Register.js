import React, { useReducer, useContext, useState } from "react";
import { Card, Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap";

import AuthContext from "../store/auth-context";
import useApi from "../hooks/use-api";
import validateEMail from "../helper/helper";

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
          // isExists:
          //   validateEMail(action.value) &&
          //   action.isEmailExists(action.value) &&
          //   false,
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
      // !state.email.isExists &&
      state.password.isValid &&
      state.cpassword.isValid,
  };
};

const Register = () => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    name: { value: "", isValid: null },
    email: { value: "", isValid: null /*, isExists: null*/ },
    password: { value: "", isValid: null },
    cpassword: { value: "", isValid: null },
    isValid: false,
  });

  // const [regSuccess, setRegSuccess] = useState(false);
  const regSuccess = false;
  const authCtx = useContext(AuthContext);
  const {isLoading, error, makeRequest: registerRequest} = useApi();
  // const [isLoading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  // let responseError = false;

  const nameHandler = (event) => {
    formDispatcher({ type: "NAME_VALIDATION", value: event.target.value });
  };

  const emailHandler = (event) => {
    formDispatcher({
      type: "EMAIL_VALIDATION",
      value: event.target.value,
      // isEmailExists: authCtx.isEmailExists,
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
      // isEmailExists: authCtx.isEmailExists,
    });
    formDispatcher({ type: "PSW_VALIDATION", value: formState.password.value });
    formDispatcher({ type: "CPSW_VALIDATION", value: formState.cpassword.value });

    if (formState.isValid) {
      let regData = {
        name: formState.name.value,
        email: formState.email.value,
        password: formState.password.value,
      };
      registerRequest({url: 'register', type: 'post', params: regData}, (response) => {
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
          authCtx.getLogin();
        } else {
          if(response.hasOwnProperty("email")){
            setEmailError(response.email);
          }else{
            console.warn(response);
          }
        }
      });
      // axios
      //   .post("http://wallet2.ads/api/register", {
      //     name: regData.name,
      //     email: regData.email,
      //     password: regData.password,
      //   })
      //   .then((response) => {
      //     // setLoading(false);
      //     console.log(response);
      //     if (response.status === 200) {
      //       if (
      //         response.data.hasOwnProperty("user") &&
      //         typeof response.data.user != "undefined"
      //       ) {
      //         authCtx.setLoggedInData(
      //           true,
      //           response.data.user,
      //           response.data.access_token,
      //           response.data.token_type
      //         );
      //         setRegSuccess(true);
      //         // setIsLogin((prevState) => !prevState);
      //         // setLoggedInUser(response.data.user);
      //       } else {
      //         setLoading(false);
      //         console.log(response);
      //         setError({
      //           title: 'Email Already Exists.',
      //           message: response.data.email,
      //         });
      //       }
      //     } else {
      //       setLoading(false);
      //       console.log(response);
      //     }
      //   })
      //   .catch((error) => {
      //     setLoading(false);
      //     console.log(error.response);
      //     setError({
      //       title: `${error.response.status} - ${error.response.statusText}`,
      //       message: error.response.data.message,
      //     });
      //   });
      // authCtx.register(regData);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col lg={3}>
        <Card>
          <h3 className="card-header mb-3 fw-normal text-center text-primary">
            Wallet
          </h3>
          <Card.Body className="pb-4">
            <Card.Title className="h3 mb-3 fw-normal text-center">Create Your Wallet Account</Card.Title>
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
            <Card.Text className="text-center">Have an account? <br /><Button variant="link" disabled={isLoading} onClick={authCtx.toLogin} className="text-decoration-none">Login</Button></Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
