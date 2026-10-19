import { Modal } from "react-bootstrap";

export default function ModalBox({ show, title, footer, onClose, children}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="shadow mb-3 text-primary">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-3">
        {children}
      </Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
}
