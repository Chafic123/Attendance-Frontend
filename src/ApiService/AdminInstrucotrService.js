import axios from "axios";
import BASE_URL from "./BaseURL";

const generateRandomPhoneNumber = () => {
    const length = Math.floor(Math.random() * 9);
    let phoneNumber = "";
    for (let i = 0; i < length; i++) {
      phoneNumber += Math.floor(Math.random() * 10); 
    }
    return phoneNumber; 
  };

export const addInstructor = async (instructorData) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  const newInstructor = {
    ...instructorData,
    phone_number: generateRandomPhoneNumber(),
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/admin/add-instructor`,
      newInstructor,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return the successful response data
  } catch (error) {
    console.error("Error adding instructor:", error.response?.data || error.message);

    // Extract error message from response if available
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to add instructor. Please try again.";

    throw new Error(errorMessage);
  }
};
export const editInstructor = async (instructorId, instructorData) => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  
    try {
      const payload = {
        ...instructorData,
        phone: generateRandomPhoneNumber(), 
      };
  
      const response = await axios.put(
        `${BASE_URL}/admin/instructors/${instructorId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data; // Return the successful response data
    } catch (error) {
      console.error("Error editing instructor:", error.response?.data || error.message);
  
      // Extract error message from response if available
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to edit instructor. Please try again.";
  
      throw new Error(errorMessage);
    }
  };
  