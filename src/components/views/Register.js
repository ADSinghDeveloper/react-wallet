import { useContext, useReducer, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { minPasswordLength, validateEMail } from "../../utilities/helper";
import CardLayout from "../layout/CardLayout";
import AuthContext from "../../store/auth-context";
import useApi from "../../hooks/use-api";
import Reform from "../form/Reform";
import Input from "../form/Input";

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
          isValid: action.value.trim().length >= minPasswordLength,
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

  const authCtx = useContext(AuthContext);
  const [emailError, setEmailError] = useState(null);
  const { isLoading, alert, makeRequest: registerRequest } = useApi();

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
        password_confirmation: formState.cpassword.value,
      };

      registerRequest({ url: "register", method: "post", params: regData }, (response) => {
          if ( response.hasOwnProperty("user") && typeof response.user != "undefined" ) {
            authCtx.setLoggedInData(response);
          } else if (response.hasOwnProperty("email")) {
            setEmailError(response.email);
          } else {
            console.error(response);
          }
        }
      );
    }
  };

  return (
  <CardLayout title="Create Account">
      <Reform onSubmit={submitHandler} alert={alert} isLoading={isLoading} isDisabled={!formState.isValid} submitButtonText="Create Account">
        <Input 
          id="name"
          label="Name" 
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
          }/>
        <Input id="email" label="Email"
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
          error={emailError}
        />
        <Input id="password" label="Password" 
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
        <Input 
          id="confirm_password"
          label="Confirm Password"
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
          hint={`Minimum password length is ${minPasswordLength} characters.`}
        />
      </Reform>
    <hr />
    <Card.Text className="text-center">
      Have an account? &nbsp;
      <NavLink to="/login" className="text-decoration-none">Login here.</NavLink>
    </Card.Text>
  </CardLayout>
  );
};

export default Register;
