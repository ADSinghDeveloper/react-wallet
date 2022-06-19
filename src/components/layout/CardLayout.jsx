import { Card } from "react-bootstrap";

const CardLayout = (props) => {
  return (
    <Card>
      <Card.Header className={`mb-3 fw-normal text-primary ${props.classes? props.classes : ''}`}>
        <Card.Title as="h4">{props.title}</Card.Title>
      </Card.Header>
      <Card.Body className="pb-4 justify-content-center">{props.children}</Card.Body>
    </Card>
  );
};

export default CardLayout;
