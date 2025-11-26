import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({
  title,
  text,
  onConfirm,
  onClose,
  variant = "primary",
}) => {
  return (
    <Modal show={true} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant={variant} onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
