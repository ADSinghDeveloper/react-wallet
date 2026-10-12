import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../store/redux/notification";

const Notification = () => {
    const dispatch = useDispatch();
    const props = useSelector((state) => state.notification);

    if(props.message == null || props.message.length < 1){
        return false;
    }

    return (
        <ToastContainer className="p-3 position-absolute top-0 end-0 mx-auto text-white text-center">
          <Toast show={props.show} bg={props.type !== 'error' ? 'success' : 'danger'} onClose={() => { dispatch(notificationActions.close())}} delay={3000} autohide >
          {props.title && <Toast.Header>
              <strong className="me-auto">{props.title}</strong>
              {/* {props.titleSmall && <small className="text-muted">just now</small>} */}
            </Toast.Header>}
            <Toast.Body>{props.message}</Toast.Body>
          </Toast>
        </ToastContainer>
    );
};

export default Notification;