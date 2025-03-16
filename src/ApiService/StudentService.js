import axios from 'axios';
import BASE_URL from './BaseURL';

export const getStudents = async () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

  if (!token) {
    console.log("No authentication token found. Please log in again.");
    return [];
  }

  if (userRole.toLowerCase() !== "admin") {
    console.warn("Unauthorized access: Only admins can fetch student data.");
    return [];
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/admin/students`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log('Fetched Students:', data);

    return Array.isArray(data?.data) ? data.data : [];

  } catch (error) {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return [];
  }
};
