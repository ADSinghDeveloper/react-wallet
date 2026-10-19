import { Card } from "react-bootstrap";
import Loader from "../Loader";

const CardLayout = ({ title, isLoading, children}) => {
  return (
    <Card className="shadow mb-3">
      <Card.Header className="mb-3 shadow text-primary">
        <Card.Title as="h4" className="mb-0 fw-medium">{title}</Card.Title>
      </Card.Header>
      <Card.Body className="pb-4 justify-content-center">
        {isLoading? <Loader /> : children}
      </Card.Body>
    </Card>
  );
};

export default CardLayout;
