import React from "react";
import { useSelector } from "react-redux";

import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import Layout from "./components/layout/Layout";
// import MsgModal from "./components/MsgModal";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const signUp = useSelector((state) => state.auth.signUp);
  const profilePage = useSelector((state) => state.auth.profile);

  return (
    <>
      {!isLoggedIn && (
        <div className="auth-box">
          {!signUp && <Login />}
          {signUp && <Register />}
        </div>
      )}
      {isLoggedIn && <Layout>
        {!profilePage && <Dashboard />}
        {profilePage && <Profile />}
        </Layout>}
      {/* <MsgModal /> */}
    </>
  );
}

export default App;
