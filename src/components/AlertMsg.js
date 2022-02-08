import React, { Fragment } from "react";
import { Alert } from 'react-bootstrap';

const AlertMsg = (props) => {
  const msg = (!props.success && props.error) || (!props.error && props.success);

  return (<Fragment>
    {props.error && <Alert variant={props.error ? "danger" : "success"} className="mt-3">
      {msg}
    </Alert>}
    </Fragment>
  );
};

export default AlertMsg;
