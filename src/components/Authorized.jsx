import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";

export default function Authorized() {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn){
      navigate("/login");
    }
  },[isLoggedIn, navigate]);

  return <Layout><Outlet /></Layout>;
}