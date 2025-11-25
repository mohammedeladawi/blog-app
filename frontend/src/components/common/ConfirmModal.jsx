import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({
  title,
  text,
  onConfirm,
  show,
  setShow,
  variant = "primary",
}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
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
