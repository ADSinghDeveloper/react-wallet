import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";

const MsgModal = (props) => {
    const [show, setShow] = useState(true);
    const onClose = () => {
        setShow(prevState => !prevState);
    }
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.children}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>Close</Button>
              {/* <Button variant="primary">Save changes</Button> */}
            </Modal.Footer>
          </Modal>
    );
}

export default MsgModal;