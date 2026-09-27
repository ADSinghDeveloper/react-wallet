import { useNavigate } from "react-router-dom";
import CardLayout from "../layout/CardLayout";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

  useEffect(() => {
    if(!isLoggedIn){
      navigate("/login");
    }
  },[isLoggedIn, navigate]);

  return (
    <CardLayout title="Dashboard">
      <div>
        Welcome here!
      </div>
    </CardLayout>
  );
};

export default Dashboard;
