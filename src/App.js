import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import AuthContext from "./store/auth-context";
import Login from "./components/views/Login";
// import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import ErrorPage from "./components/views/ErrorPage";
import { getLocalAuthKey, removeLocalAuthKey, setLocalAuthKey } from "./utilities/helper";
import useApi from "./hooks/use-api";
import Loader from "./components/Loader";
import { authActions } from "./store/redux/auth";
import Accounts from "./components/views/Accounts";
import AccountDetails from "./components/views/AccountDetails";
import accountsLoader from "./components/views/accounts-loader";
import accountDetailsLoader from "./components/views/account-details-loader";
import Authorized from "./components/Authorized";
import Layout from "./components/layout/Layout";

const Register = lazy(() => import("./components/views/Register"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authorized />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard />}, // same exactly as parent path.
      { path: 'profile', element: <Profile />},
      { path: "accounts", element: <Accounts />, loader: accountsLoader, id: "accounts-list"},
      { path: "accounts/:accId", element: <AccountDetails />, loader: accountDetailsLoader},
    ],
  },
  { path: '/login', errorElement: <ErrorPage />, element: <Login />},
  { path: '/register', errorElement: <ErrorPage />, element: <Layout><Suspense fallback={<Loader />}><Register /></Suspense></Layout>},
]);

function App() {
  // const { isLoggedIn, setLoggedInData, accessToken } = use(AuthContext);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const accessToken = useSelector(store => store.auth.accessToken);
  const dispatch = useDispatch();
  const { isLoading, makeRequest: authProfileRequest } = useApi();

  useEffect(() => {
    const localAuthKey = getLocalAuthKey();
    // Logged-in users can reload the browser manually and get login again automatically with their last used authorization API key.
    // This feature added, just to try if app do not work as expected and user need to reload the whole app/page.
    // This is also just for practise useEffect hook.

    if (localAuthKey?.access_token && !isLoggedIn) {
      authProfileRequest({ url: "profile", ...localAuthKey }, (response) => {
        dispatch( authActions.setLoggedInData({ user: { ...response }, ...localAuthKey }));
        // setLoggedInData({user: {...response}, ...localAuthKey});
        removeLocalAuthKey();
      });
    }

    const handleBeforeUnload = (event) => {
      setLocalAuthKey(accessToken);
    }

    if(isLoggedIn){
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [isLoggedIn, authProfileRequest, dispatch, accessToken]);

  return isLoading ? <Loader /> : <RouterProvider router={router} />
}

export default App;
