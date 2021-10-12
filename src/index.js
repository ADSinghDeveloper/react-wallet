import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

/*
useReducer, useState, useContext, useEffect
export default React.memo(<Component />); // to prevent useless running but it costs to check props changes and comparission to React !important, then need to use useCallback(()=>{}, []) "[] is for dependencies like useEffect"
findIndex()
filter()
reduce()
map()
includes()
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
