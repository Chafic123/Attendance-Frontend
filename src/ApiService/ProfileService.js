import axios from "axios";
import BASE_URL from "./BaseURL";

export const getStudentDetails = async () => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

  if (!token) {
    console.error("No authentication token found.");
    return null;
  }

  try {
    const response = await axios.get(`${BASE_URL}/${userRole.toLowerCase()}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      withCredentials: true, 
    });
    console.log("ProfileTop: ", response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student details:", error.response?.data || error.message);
    return null;
  }
};
