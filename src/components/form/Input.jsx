import { Form } from "react-bootstrap";

export default function Input({id, label, hint, error, ...props}) {
  return (
    <Form.Group className="mb-2 form-floating" controlId={id}>
      <Form.Control
        {...props}
      />
      <Form.Label>{label}</Form.Label>
      <Form.Text className="text-muted">{hint}</Form.Text>
      { error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
}
