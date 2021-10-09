import React, {useState} from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);

    const loginHandler = (un,psw) => {
      setIsLogin(true);
    }

    const logoutHandler = () => {
      setIsLogin(false);
    }

    return <AuthContext.Provider value={{
        isLoggedIn: isLogin,
        login: loginHandler,
        logout: logoutHandler,
      }}>{props.children}</AuthContext.Provider>
};

export default AuthContext;
