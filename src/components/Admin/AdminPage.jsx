// AdminPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Modal from "react-modal";
import "./AdminPage.css";

Modal.setAppElement("#root");

const AdminPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: "",
    category: "",
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [apiUrl]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/menu`, formData);
      fetchMenuItems();
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleUpdateClick = (id) => {
    const selectedItem = menuItems.find((item) => item._id === id);
    setFormData({
      name: selectedItem.name,
      price: selectedItem.price,
      ingredients: selectedItem.ingredients.join(", "),
      category: selectedItem.category,
    });
    setShowUpdateModal(true);
    setSelectedItemId(id);
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setSelectedItemId(null);
  };

  const handleUpdateFormUpdate = () => {
    fetchMenuItems();
    handleUpdateModalClose();
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await handleDelete(deleteItemId);
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/menu/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Page</h2>
      <h1 to="/admin/add" className="admin-link">
        Add New Item
      </h1>
       {" "}
      <form onSubmit={handleSubmit} className="admin-form">
               {" "}
        <label>
                    Name:          {" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="admin-input"
          />
                 {" "}
        </label>
               {" "}
        <label>
                    Price:          {" "}
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="admin-input"
          />
                 {" "}
        </label>
               {" "}
        <label>
                    Ingredients:          {" "}
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            className="admin-input"
          />
                 {" "}
        </label>
               {" "}
        <label>
                    Category:          {" "}
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="admin-input"
          />
                 {" "}
        </label>
               {" "}
        <button type="submit" className="admin-button">
                    Add Item        {" "}
        </button>
             {" "}
      </form>
      <h3 className="menu-items-title">Menu Items</h3>
      <ul className="menu-items-list">
        {menuItems.map((item) => (
          <li key={item._id} className="menu-item">
            {item.name} - {item.price} - {item.category}
            <button
              onClick={() => handleUpdateClick(item._id)}
              className="update-button"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteClick(item._id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {showUpdateModal && (
        <UpdateForm
          isOpen={showUpdateModal}
          onRequestClose={handleUpdateModalClose}
          itemId={selectedItemId}
          onUpdate={handleUpdateFormUpdate}
          initialData={{
            name: formData.name,
            price: formData.price,
            ingredients: formData.ingredients,
            category: formData.category,
          }}
        />
      )}
    </div>
  );
};

export default AdminPage;
