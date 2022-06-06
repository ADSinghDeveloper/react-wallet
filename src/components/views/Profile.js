import React, { useReducer } from "react";
import { Card, Col, Row, Form, Spinner, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import useApi from "../../hooks/use-api";
import validateEMail from "../../helper/helper";
import AlertMsg from "../AlertMsg";
// import { useHistory } from "react-router-dom";

const formReducer = (state, action) => {
  const PSW_LENGTH = 6;
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
          current_password: {
            value: action.value.trim(),
            isValid: action.value.trim().length >= PSW_LENGTH,
          },
        };
        break;
    case "NPSW_VALIDATION":
      state = {
        ...state,
        new_password: {
          value: action.value.trim(),
          isValid: action.value.trim().length > PSW_LENGTH,
        },
        confirm_password: {
          value: state.confirm_password.value,
          isValid: state.confirm_password.isValid !== null && state.confirm_password.value === action.value,
        },
      };
      break;
      case "CPSW_VALIDATION":
        state = {
          ...state,
          confirm_password: {
            value: action.value,
            isValid:
              state.new_password.isValid === true &&
              state.new_password.value === action.value,
          },
        };
        break;
        case "RESET":
          state = {
            ...state,
            current_password: { value: "", isValid: null },
            new_password: { value: "", isValid: null },
            confirm_password: { value: "", isValid: null },
          };
          break;
    default:
      throw new Error("Action type is required.");
  }

  return {
    ...state,
    isValid: state.current_password.isValid && (state.name.isValid !== false && state.new_password.isValid !== false && state.confirm_password.isValid !== false),
  };
};

const Profile = () => {
  const authUser = useSelector(state => state.auth.authUser);
  const dispatch = useDispatch();
  // const history = useHistory();
  const defaultForm = {
    id: { value: authUser.id },
    email: { value: authUser.email },
    name: { value: authUser.name, isValid: null },
    current_password: { value: "", isValid: null },
    new_password: { value: "", isValid: null },
    confirm_password: { value: "", isValid: null },
    isValid: null,
  };
  const [formState, formDispatcher] = useReducer(formReducer, defaultForm);
  const { isLoading, alert, makeRequest: profileUpdateRequest } = useApi();

  const nameHandler = (event) => {
    formDispatcher({ type: "NAME_VALIDATION", value: event.target.value });
  };

  const pswHandler = (event) => {
    formDispatcher({ type: "PSW_VALIDATION", value: event.target.value });
  }

  const npswHandler = (event) => {
    formDispatcher({ type: "NPSW_VALIDATION", value: event.target.value });
  }

  const cpswHandler = (event) => {
    formDispatcher({ type: "CPSW_VALIDATION", value: event.target.value });
  }

  const submitHandler = (event) => {
    event.preventDefault();

    formDispatcher({ type: "NAME_VALIDATION", value: formState.name.value });
    formDispatcher({ type: "PSW_VALIDATION", value: formState.current_password.value });

    if(formState.new_password.isValid != null){
      formDispatcher({ type: "NPSW_VALIDATION", value: formState.new_password.value });
      formDispatcher({ type: "CPSW_VALIDATION", value: formState.confirm_password.value });
    }

    if (formState.isValid) {
      let profileData = {
        id: formState.id.value,
        name: formState.name.value,
        email: formState.email.value,
        curr_psw: formState.current_password.value,
        new_psw: formState.new_password.value,
        conf_psw: formState.confirm_password.value,
      };
      profileUpdateRequest({
        type: 'patch',
        url: 'save_profile',
        params: profileData
      }, (response) => {
        if ( !response.error && 
          response.hasOwnProperty("user") &&
          typeof response.user != "undefined"
        ) {
          dispatch(
            authActions.updateAuthUser({ user: response.user })
          );
          formDispatcher({ type: "RESET" });
          // history.push('/');
        } else {
          console.warn(response);
        }
      });
    }else{
      console.error('Invalid Form');
      console.log(formState);
    }
  }

  return (
    <Row className="justify-content-md-center">
      <Col lg={6}>
        <Card>
          <Card.Header>
            <Card.Title as="h4" className="text-primary">
              Profile
            </Card.Title>
          </Card.Header>
          <Card.Body className="pb-4">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-2 form-floating" controlId="name">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={formState.name.value}
                  onChange={nameHandler}
                  onBlur={nameHandler}
                  tabIndex={1}
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
                <Form.Control type="email" placeholder="Email" value={formState.email.value} readOnly />
                <Form.Label>Email</Form.Label>
              </Form.Group>
              <Form.Group className="mb-2 form-floating" controlId="current_password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formState.current_password.value}
                  onChange={pswHandler}
                  onBlur={pswHandler}
                  className={
                    formState.current_password.isValid != null
                      ? formState.current_password.isValid
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                />
                <Form.Label>Current Password</Form.Label>
              </Form.Group>
              <Form.Group className="mb-2 form-floating" controlId="new_password">
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  value={formState.new_password.value}
                  onChange={npswHandler}
                  onBlur={npswHandler}
                  className={
                    formState.new_password.isValid != null
                      ? formState.new_password.isValid
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                />
                <Form.Label>New Password</Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-2 form-floating"
                controlId="confirm_password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={formState.confirm_password.value}
                  onChange={cpswHandler}
                  onBlur={cpswHandler}
                  className={
                    formState.confirm_password.isValid != null
                      ? formState.confirm_password.isValid
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                />
                <Form.Label>Confirm Password</Form.Label>
              </Form.Group>
              <Form.Group className="mt-4 text-center">
                {isLoading && !alert.success && (
                  <Spinner animation="border" variant="primary" />
                )}
                {!isLoading && (
                  <Button variant="primary" type="submit" disabled={formState.isValid !== true}>
                    Save
                  </Button>
                )}
              </Form.Group>
            </Form>
            <AlertMsg {...alert} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
