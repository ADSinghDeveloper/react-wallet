import { useSelector } from "react-redux";
import CardLayout from "../layout/CardLayout";

const Dashboard = () => {
  const authUserName = useSelector((state) => state.auth.authUser.name);

  return (
    <CardLayout title="Dashboard">
      <div className="text-success">
        Welcome {authUserName}!
      </div>
    </CardLayout>
  );
};

export default Dashboard;
