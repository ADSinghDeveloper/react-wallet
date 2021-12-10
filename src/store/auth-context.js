import React, { useState } from "react";

import useApi from "../hooks/use-api";

const AuthContext = React.createContext({
  isLoggedIn: false,
  accessToken: { token: "", type: "" },
  authUser: { name: "" },
  setLoggedInData: (status, user, token, tokenType) => {},
  logout: () => {},
  toRegister: () => {},
  toLogin: () => {},
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

  const { makeRequest: logoutRequest } = useApi();

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
    toRegister: getRegisterHandler,
    toLogin: getLoginHandler,
    signUp: getRegisterFlag
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
