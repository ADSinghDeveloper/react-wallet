import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Layout from "./layout/Layout";
import Loader from "./Loader";
import { authActions } from "../store/redux/auth";
import fetchApi, { hasAuthToken, setAuthTokenToApiHeader } from "../utilities/fetch-api";

setAuthTokenToApiHeader();

export default function Authorized() {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["autoLogin"],
    queryFn: ({signal}) => fetchApi({ signal, url: "profile" }),
    enabled: hasAuthToken(),
    staleTime: 0, // how long the cached data would be stored or retained.
    gcTime: 0, // garbage collection time.
    retry: false, // Retry to API request.
  });

  useEffect(() => {
    // This feature added, just to try if logged-in users need to reload the browser manually
    // and get login again automatically with their last used authorization API key.

    if(data && "id" in data){
      dispatch( authActions.setLoggedInData({user: {...data}}) )
    }

    if(!isLoading && !isLoggedIn){
      navigate("/login");
    }

  }, [isLoading, isLoggedIn, navigate, data, dispatch]);

  return <Layout>{isLoading ? <Loader /> : <Outlet /> }</Layout>
}
