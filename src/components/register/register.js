import React, { useReducer, useContext, useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import AuthContext from "../../store/auth-context";

const emailValidRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// const pswStrengthRegex = (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,});

const formReducer = (state, action) => {
  switch (action.type) {
    case "NAME_VALIDATION":
      state = {
        ...state,
        name: {
          val: action.value,
          isValid: action.value.trim().length > 2,
        },
      };
      break;
    case "EMAIL_VALIDATION":
      state = {
        ...state,
        email: {
          val: action.value,
          isValid: emailValidRegex.test(action.value),
          isExists: emailValidRegex.test(action.value) && action.isEmailExists(action.value),
        },
      };
      break;
    case "PSW_VALIDATION":
      state = {
        ...state,
        password: {
          val: action.value.trim(),
          isValid: action.value.trim().length > 7,
        },
      };
      break;
    case "CPSW_VALIDATION":
      state = {
        ...state,
        cpassword: {
          val: action.value,
          isValid:
            state.password.isValid === true &&
            state.password.val === action.value,
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
      !state.email.isExists &&
      state.password.isValid &&
      state.cpassword.isValid,
  };
};

const Register = () => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    name: { val: "", isValid: null },
    email: { val: "", isValid: null, isExists: null },
    password: { val: "", isValid: null },
    cpassword: { val: "", isValid: null },
    isValid: false,
  });

  const [regSuccess, setRegSuccess] = useState(false);
  const authCtx = useContext(AuthContext);

  const nameHandler = (event) => {
    formDispatcher({ type: "NAME_VALIDATION", value: event.target.value });
  };

  const emailHandler = (event) => {
    formDispatcher({ type: "EMAIL_VALIDATION", value: event.target.value, isEmailExists: authCtx.isEmailExists });
  };

  const passwordHandler = (event) => {
    formDispatcher({ type: "PSW_VALIDATION", value: event.target.value });
  };

  const cpasswordHandler = (event) => {
    formDispatcher({ type: "CPSW_VALIDATION", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    formDispatcher({ type: "NAME_VALIDATION", value: formState.name.val });
    formDispatcher({ type: "EMAIL_VALIDATION", value: formState.email.val, isEmailExists: authCtx.isEmailExists });
    formDispatcher({ type: "PSW_VALIDATION", value: formState.password.val });
    formDispatcher({ type: "CPSW_VALIDATION", value: formState.cpassword.val });
    console.log(formState);
    if (formState.isValid) {
      let regData = {name: formState.name.val, email: formState.email.val, password: formState.password.val};
      authCtx.register(regData);
      setRegSuccess(true);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col lg={3}>
        <Card>
          <h3 className="card-header mb-3 fw-normal text-center text-primary">
            Register
          </h3>
          <Card.Body>
            {/* <Card.Title className="h3 mb-3 fw-normal text-center">Register</Card.Title> */}
            {!regSuccess && <Form onSubmit={submitHandler}>
              <Form.Group className="mb-2 form-floating" controlId="name">
                <Form.Control
                  placeholder="Enter Your Name"
                  value={formState.name.val}
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
                  value={formState.email.val}
                  className={
                    formState.email.isValid != null
                      ? formState.email.isValid && !formState.email.isExists
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                  onChange={emailHandler}
                  onBlur={emailHandler}
                />
                <Form.Label>Email address</Form.Label>
                {formState.email.isExists && <Form.Text className="text-danger">Email already exists.</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-2 form-floating" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formState.password.val}
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
                  value={formState.cpassword.val}
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
              <Form.Group className="mt-4 text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="mb-3 w-100"
                  // disabled={!formState.isValid}
                >
                  Register
                </Button>
              </Form.Group>
            </Form>}
            {regSuccess && <div className="alert alert-success" role="alert">You have been registered successfully.</div>}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
