import React, { useReducer } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";

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
          statusClass: state.name.isValid === true ? "is-valid" : "is-invalid",
        },
      };
      break;
    case "EMAIL_VALIDATION":
      state = {
        ...state,
        email: {
          val: action.value,
          isValid: emailValidRegex.test(action.value),
          statusClass: state.email.isValid === true ? "is-valid" : "is-invalid",
        },
      };
      break;
    case "PSW_VALIDATION":
      state = {
        ...state,
        psw: {
          val: action.value.trim(),
          isValid: action.value.trim().length > 7,
          statusClass: state.psw.isValid === true ? "is-valid" : "is-invalid",
        },
      };
      break;
    case "CPSW_VALIDATION":
      state = {
        ...state,
        cpsw: {
          val: action.value,
          isValid: state.psw.isValid === true && state.psw.val === action.value,
          statusClass: state.cpsw.isValid === true ? "is-valid" : "is-invalid",
        },
      };
      break;
    default:
      throw new Error("Action type is required.");
  }
  return { ...state, isValid: state.name.isValid && state.email.isValid && state.psw.isValid && state.cpsw.isValid };
};

const Register = () => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    name: { val: "", isValid: null, statusClass: "" },
    email: { val: "", isValid: null, statusClass: "" },
    psw: { val: "", isValid: null, statusClass: "" },
    cpsw: { val: "", isValid: null, statusClass: "" },
    isValid: false,
  });

  const nameHandler = (event) => {
    formDispatcher({ type: "NAME_VALIDATION", value: event.target.value });
  };

  const emailHandler = (event) => {
    formDispatcher({ type: "EMAIL_VALIDATION", value: event.target.value });
  };

  const pswHandler = (event) => {
    formDispatcher({ type: "PSW_VALIDATION", value: event.target.value });
  };

  const cpswHandler = (event) => {
    formDispatcher({ type: "CPSW_VALIDATION", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    formDispatcher({ type: "NAME_VALIDATION", value: formState.name.val });
    formDispatcher({ type: "EMAIL_VALIDATION", value: formState.email.val });
    formDispatcher({ type: "PSW_VALIDATION", value: formState.psw.val });
    formDispatcher({ type: "CPSW_VALIDATION", value: formState.cpsw.val });
  };

  return (
    <Row className="justify-content-md-center">
      <Col lg={3}>
        <Card>
        <h3 className="card-header mb-4 fw-normal text-center text-primary">Register</h3>
          <Card.Body>
            {/* <Card.Title className="h3 mb-3 fw-normal text-center">Register</Card.Title> */}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-2 form-floating" controlId="name">
                <Form.Control
                  placeholder="Enter Your Name"
                  value={formState.name.val}
                  onChange={nameHandler}
                  onBlur={nameHandler}
                  className={formState.name.isValid != null ? (formState.name.isValid ? 'is-valid' : 'is-invalid') : ''}
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>
              <Form.Group className="mb-2 form-floating" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={formState.email.val}
                  className={formState.email.isValid != null ? (formState.email.isValid ? 'is-valid' : 'is-invalid') : ''}
                  onChange={emailHandler}
                  onBlur={emailHandler}
                />
                <Form.Label>Email address</Form.Label>
              </Form.Group>
              <Form.Group className="mb-2 form-floating" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formState.psw.val}
                  className={formState.psw.isValid != null ? (formState.psw.isValid ? 'is-valid' : 'is-invalid') : ''}
                  onChange={pswHandler}
                  onBlur={pswHandler}
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <Form.Group className="mb-2 form-floating" controlId="confirm_password">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={formState.cpsw.val}
                  className={formState.cpsw.isValid != null ? (formState.cpsw.isValid ? 'is-valid' : 'is-invalid') : ''}
                  onChange={cpswHandler}
                  onBlur={cpswHandler}
                />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Text className="text-muted">
                    Minimum password length is 8 characters.
                  </Form.Text>
              </Form.Group>
              <Form.Group
                className="mt-4 text-center"
              >
                <Button
                  variant="primary"
                  type="submit"
                  className="mb-4 w-100"
                  // disabled={!formState.isValid}
                >
                  Register
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
