import axios from "axios";
import BASE_URL from "./BaseURL"; 

export const getCourseStudents = async (courseId) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  const response = await axios.get(`${BASE_URL}/${userRole}/courses/${courseId}/students`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; 
};
