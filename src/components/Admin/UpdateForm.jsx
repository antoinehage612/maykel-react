import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./UpdateForm.css";

Modal.setAppElement("#root");

const UpdateForm = ({
  isOpen,
  onRequestClose,
  itemId,
  onUpdate,
  onGoBack,
  initialData,
}) => {
  const [updatedData, setUpdatedData] = useState({
    name: "",
    price: "",
    ingredients: "",
    category: "",
  });

  useEffect(() => {
    if (initialData) {
      setUpdatedData({
        name: initialData.name,
        price: initialData.price,
        ingredients: initialData.ingredients,
        category: initialData.category,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/menu/${itemId}`, updatedData);
      onUpdate();
      onRequestClose();
      onGoBack();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Item Modal"
      className="update-modal"
    >
      <h2 className="update-title">Update Item</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedData.name}
            onChange={handleInputChange}
            className="update-input"
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={updatedData.price}
            onChange={handleInputChange}
            className="update-input"
          />
        </label>
        <label>
          Ingredients:
          <input
            type="text"
            name="ingredients"
            value={updatedData.ingredients}
            onChange={handleInputChange}
            className="update-input"
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={updatedData.category}
            onChange={handleInputChange}
            className="update-input"
          />
        </label>
        <button type="button" onClick={handleUpdate} className="update-button">
          Update Item
        </button>
      </form>
    </Modal>
  );
};

export default UpdateForm;
