import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const Dashboard = () => {
  const authUserName = useSelector((state) => state.auth.authUser.name);

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4" className="text-primary">Dashboard</Card.Title>
      </Card.Header>
      <Card.Body className="pb-4">
        <div className="text-success">
          Welcome {authUserName}!
        </div>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
