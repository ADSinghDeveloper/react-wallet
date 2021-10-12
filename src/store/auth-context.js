import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  loggedInUser: {},
  login: () => {},
  logout: () => {},
  register: (regData) => {},
  isEmailExists: (em) => {},
});

export const AuthContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const lsUserIndex = "rwUsers";

  if (!localStorage.hasOwnProperty(lsUserIndex)) {
    localStorage.setItem(lsUserIndex, JSON.stringify([]));
  }

  const loginHandler = (loginData) => {
    // console.log(loginData);
    let rwUsersData = JSON.parse(localStorage.getItem(lsUserIndex));
    let indexFound = rwUsersData.findIndex(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );

    if (indexFound >= 0) {
      setIsLogin((prevState) => !prevState);
    }else{
      console.error("Wrong Password");  
    }
  };

  const getLoggedInUser = () => {
  }

  const logoutHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const isEmailExistsHandler = (email) => {
    let rwUsersData = JSON.parse(localStorage.getItem(lsUserIndex));
    let indexFound = rwUsersData.findIndex((user) => user.email === email);
    return indexFound >= 0;
  };

  const registerHandler = (regData) => {
    // console.log(regData);
    let rwUsersData = JSON.parse(localStorage.getItem(lsUserIndex));
    if (rwUsersData.length > 0) {
      rwUsersData.push(regData);
    } else {
      rwUsersData = [regData];
    }
    localStorage.setItem(lsUserIndex, JSON.stringify(rwUsersData));
  };

  const authCtx = {
    isLoggedIn: isLogin,
    loggedInUser: getLoggedInUser,
    login: loginHandler,
    logout: logoutHandler,
    register: registerHandler,
    isEmailExists: isEmailExistsHandler,
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
