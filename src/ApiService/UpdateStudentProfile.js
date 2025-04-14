import axios from 'axios';
import BASE_URL from './BaseURL'; 
export const updateStudentProfile = async (firstName, lastName, imageFile, videoFile) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  try {
    const formData = new FormData();
    formData.append('first_name', firstName || 'John');
    formData.append('last_name', lastName || 'Doe');
    formData.append('phone_number', '1234567890');

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (videoFile) {
      formData.append('video', videoFile);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const response = await axios.post(`${BASE_URL}/student/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    throw error;
  }
};