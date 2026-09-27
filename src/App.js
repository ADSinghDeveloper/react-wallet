import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import AuthContext from "./store/auth-context";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import Layout from "./components/layout/Layout";
import ErrorPage from "./components/views/ErrorPage";
import { getLocalAuthKey } from "./utilities/helper";
import useApi from "./hooks/use-api";
import Loader from "./components/Loader";
import { authActions } from "./store/redux/auth";
import Accounts from "./components/views/Accounts";
import AccountDetails from "./components/views/AccountDetails";
import accountsLoader from "./components/views/accounts-loader";
import accountDetailsLoader from "./components/views/account-details-loader";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard />}, // same exactly as parent path.
      { path: '/profile', element: <Profile />},
      { path: '/login', element: <Login />},
      { path: '/register', element: <Register />},
      { path: "accounts", element: <Accounts />, loader: accountsLoader, id: "accounts-list"},
      { path: "accounts/:accId", element: <AccountDetails />, loader: accountDetailsLoader},
    ]
  }
]);

function App() {
  // const { isLoggedIn, setLoggedInData } = use(AuthContext);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { isLoading, makeRequest: authProfileRequest } = useApi();

  useEffect(() => {
    const localAuthKey = getLocalAuthKey();
    // Logged-in users can reload the browser manually and get login again automatically with their last used authorization API key.
    // This feature added, just to try if app do not work as expected and user need to reload the whole app/page.
    // This is also just for practise useEffect hook.
    if (localAuthKey?.access_token && !isLoggedIn) {
      authProfileRequest(
        {
          url: "profile",
          ...localAuthKey,
        },
        (response) => {
          dispatch(
            authActions.setLoggedInData({
              user: { ...response },
              ...localAuthKey,
            }),
          );
          // setLoggedInData({user: {...response}, ...localAuthKey});
        },
      );
    }
  }, [isLoggedIn, authProfileRequest, dispatch]);

  return isLoading ? <Loader /> : <RouterProvider router={router} />
}

export default App;
