import React from "react";
import Modal from "react-modal";
import "./DeleteConfirmationModal.css";

Modal.setAppElement("#root");

const DeleteConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation Modal"
      className="delete-confirmation-modal"
    >
      <h2 className="delete-confirmation-title">Delete Item</h2>
      <p>Are you sure you want to delete this item?</p>
      <div className="delete-confirmation-buttons">
        <button onClick={onConfirm} className="delete-confirm-button">
          Yes
        </button>
        <button onClick={onCancel} className="delete-cancel-button">
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
