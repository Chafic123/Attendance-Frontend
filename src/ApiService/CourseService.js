import axios from 'axios';

  const BASE_URL = "https://88ec-185-26-85-248.ngrok-free.app/api";
  
  export const getCourses = async () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
    if (!token) {
      console.log("No authentication token found. Please log in again.");
      return [];
    }
  
    try {
      const { data } = await axios.get(`${BASE_URL}/student/courses`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Courses:', data);
      return Array.isArray(data) ? data : [];
  
    } catch (error) {
      console.error('API Error:', error.response?.status, error.response?.data || error.message);
      return [];
    }
  };
  