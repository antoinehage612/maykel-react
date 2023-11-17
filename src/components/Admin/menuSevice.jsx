import axios from "axios";

const getMenuItems = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/menu");
    return response.data;
  } catch (error) {
    console.error("Error Getting menu items:", error);
    throw error;
  }
};

export { getMenuItems };
