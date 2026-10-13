import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../store/redux/notification";

const Notification = () => {
    const dispatch = useDispatch();
    const { show, type, title, message } = useSelector((state) => state.notification);

    return (
        <ToastContainer position="top-end" className="p-3 mx-auto text-white text-center">
          <Toast show={show} bg={type !== 'error' ? 'success' : 'danger'} onClose={() => { dispatch(notificationActions.close())}} delay={3000} autohide >
            <Toast.Header>
              <strong className="me-auto">{title || "Success"}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
    );
};

export default Notification;