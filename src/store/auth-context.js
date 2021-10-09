import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  register: () => {},
  isEmailExists: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const lsUserIndex = "rwUsers";

  if(!localStorage.hasOwnProperty(lsUserIndex)){
    localStorage.setItem(lsUserIndex, JSON.stringify([]));
  }

  const loginHandler = (un, psw) => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setIsLogin(false);
  };

  const isEmailExistsHandler = (email) => {
    let rwUsersData = JSON.parse(localStorage.getItem(lsUserIndex));
    let indexFound = rwUsersData.findIndex((user) => user.email === email);
    return indexFound >= 0;
  };

  const registerHandler = (regData) => {
    console.log(regData);
    let rwUsersData = JSON.parse(localStorage.getItem(lsUserIndex));
    if (rwUsersData.length > 0) {
      rwUsersData.push(regData);
    } else {
      rwUsersData = [regData];
    }
    localStorage.setItem(lsUserIndex, JSON.stringify(rwUsersData));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLogin,
        login: loginHandler,
        logout: logoutHandler,
        register: registerHandler,
        isEmailExists: isEmailExistsHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
