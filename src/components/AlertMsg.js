import { Alert } from 'react-bootstrap';

const AlertMsg = ({error, success}) => {
  return (<>
    {(error || success) && <Alert variant={error ? "danger" : "success"} className="mt-3">
      {(!error && success) || (!success && error)}
    </Alert>}
    </>
  );
};

export default AlertMsg;
