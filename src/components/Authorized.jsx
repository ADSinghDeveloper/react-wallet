import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import useApi from "../hooks/use-api";
import { getLocalAuthKey, removeLocalAuthKey, setLocalAuthKey } from "../utilities/helper";
import Loader from "./Loader";
import { authActions } from "../store/redux/auth";

export default function Authorized() {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const navigate = useNavigate();
  // const { isLoggedIn, setLoggedInData, accessToken } = use(AuthContext);
  const accessToken = useSelector(store => store.auth.accessToken);
  const dispatch = useDispatch();
  const { makeRequest: authProfileRequest} = useApi();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Logged-in users can reload the browser manually and get login again automatically
    // with their last used authorization API key.
    // This feature added, just to try if user need to reload the whole app/page.
    // This is also just for practise useEffect hook.

    const localAuthKey = getLocalAuthKey();

    if (localAuthKey?.access_token) {
      authProfileRequest({ url: "profile", ...localAuthKey }, (response) => {
        dispatch( authActions.setLoggedInData({ user: { ...response }, ...localAuthKey }));
        // setLoggedInData({user: {...response}, ...localAuthKey});
        setCheckingAuth(false);
        removeLocalAuthKey();
      });
    }else{
      setCheckingAuth(false);
    }

    if(!checkingAuth && !isLoggedIn){
      navigate("/login");
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
  }, [checkingAuth, isLoggedIn, authProfileRequest, dispatch, navigate, accessToken]);

  return <Layout>{checkingAuth? <Loader /> : <Outlet /> }</Layout>
}
