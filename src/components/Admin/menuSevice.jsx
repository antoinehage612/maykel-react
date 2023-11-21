import axios from "axios";

const getMenuItems = async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  try {
    const response = await axios.get(`${apiUrl}/menu`);
    return response.data;
  } catch (error) {
    console.error("Error Getting menu items:", error);
    throw error;
  }
};

export { getMenuItems };
