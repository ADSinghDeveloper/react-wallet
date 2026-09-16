import { Form, Button } from "react-bootstrap";
import AlertMsg from "../AlertMsg";
import Loader from "../Loader";

export default function Reform ({ children, onSubmit, alert, isLoading, isDisabled, submitButtonText}){
  return <Form onSubmit={onSubmit}>
    {children}
    <AlertMsg {...alert} />
    <Form.Group className="mt-4">
      {isLoading && <Loader type="primary" />}
      {!isLoading && (
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={isDisabled}
        >
          {submitButtonText}
        </Button>
      )}
    </Form.Group>
  </Form>
}