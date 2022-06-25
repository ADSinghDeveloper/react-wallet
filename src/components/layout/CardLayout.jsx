import { Card } from "react-bootstrap";
import Loader from "../Loader";

const CardLayout = (props) => {
  return (
    <Card className="shadow mb-3">
      <Card.Header className={`mb-3 shadow text-primary ${props.cssClass || ''}`}>
        <Card.Title as="h4" className="mb-0">{props.title}</Card.Title>
      </Card.Header>
      <Card.Body className="pb-4 justify-content-center">
        {props.isLoading && <Loader />}
        {!props.isLoading && props.children}
      </Card.Body>
    </Card>
  );
};

export default CardLayout;
