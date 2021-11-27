import React, { useState } from "react";

import useApi from "../hooks/use-api";

const AuthContext = React.createContext({
  isLoggedIn: false,
  accessToken: { token: "", type: "" },
  authUser: { name: "" },
  setLoggedInData: (status, user, token, tokenType) => {},
  logout: () => {},
  getRegister: () => {},
  getLogin: () => {},
  signUp: false,
});

export const AuthContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [getRegisterFlag, setGetRegisterFlag] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [accessTokenData, setAccessTokenData] = useState({
    token: "",
    type: "",
  });
  // const lsUserIndex = "rwUsers";
  const { makeRequest: logoutRequest } = useApi();

  // if (!localStorage.hasOwnProperty(lsUserIndex)) {
  //   localStorage.setItem(lsUserIndex, JSON.stringify([]));
  // }

  // const loginHandler = (loginData) => {
  //   console.log(loginData)
  // };

  const logoutHandler = () => {
    logoutRequest(
      {
        url: "logout",
        type: "post",
        headers: {
          Authorization: `${accessTokenData.type} ${accessTokenData.token}`,
        },
      },
      (response) => {
        console.log(response.message);
        setLoggedInData(false, {}, null, null);
      }
    );
  };

  // const isEmailExistsHandler = (email) => {
  //   let rwUsersData = JSON.parse(localStorage.getItem(lsUserIndex));
  //   let indexFound = rwUsersData.findIndex((user) => user.email === email);
  //   return indexFound >= 0;
  // };

  // const registerHandler = (regData) => {
  //   let rwUsersData = JSON.parse(localStorage.getItem(lsUserIndex));
  //   if (rwUsersData.length > 0) {
  //     rwUsersData.push(regData);
  //   } else {
  //     rwUsersData = [regData];
  //   }
  //   localStorage.setItem(lsUserIndex, JSON.stringify(rwUsersData));
  // };

  const setLoggedInData = (status, user, token, tokenType) => {
    setIsLogin(status);
    setLoggedInUser(user);
    setAccessTokenData({ token: token, type: tokenType });
  };

  const getRegisterHandler = () => {
    setGetRegisterFlag(true);
  }

  const getLoginHandler = () => {
    setGetRegisterFlag(false);
  }

  const authCtx = {
    isLoggedIn: isLogin,
    accessToken: accessTokenData,
    authUser: loggedInUser,
    setLoggedInData: setLoggedInData,
    logout: logoutHandler,
    getRegister: getRegisterHandler,
    getLogin: getLoginHandler,
    signUp: getRegisterFlag
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
