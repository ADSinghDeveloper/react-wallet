import React from "react";
import { Modal } from "react-bootstrap";

const MsgModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onClose} centered>
      <Modal.Header closeButton className={`mb-3 text-primary ${props.class}`}>
        <Modal.Title className="fw-normal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-4">
        {props.children}
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
}

export default MsgModal;