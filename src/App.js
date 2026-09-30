import { lazy, Suspense} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/views/Login";
// import Register from "./components/views/Register";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import ErrorPage from "./components/views/ErrorPage";
import Loader from "./components/Loader";
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
  return <RouterProvider router={router} />
}

export default App;
