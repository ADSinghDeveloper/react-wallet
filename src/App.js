import { lazy, Suspense} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

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
import { queryClient } from "./utilities/fetch-api";

const Register = lazy(() => import("./components/views/Register"));

const router = createBrowserRouter([
  {
    path: '/', element: <Authorized />, errorElement: <ErrorPage />, children: [
      { index: true, element: <Dashboard />}, // same exactly as parent path.
      { path: 'profile', element: <Profile />},
      { path: "accounts", element: <Accounts />, loader: accountsLoader, id: "accounts-list"},
      { path: "accounts/:accId", element: <AccountDetails />, loader: accountDetailsLoader},
      { path: '/login', element: <Login />},
      { path: '/register', element: <Suspense fallback={<Loader />}><Register /></Suspense>},
    ],
  },
]);

function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>
}

export default App;
