import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const authUserName = useSelector(state => state.authUser.name);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  }

  return (
    <div className="text-success">
      Welcome {authUserName}!
      <br />
      You have been LoggedIn Successfully!
      <br />
      <Button variant="primary" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
