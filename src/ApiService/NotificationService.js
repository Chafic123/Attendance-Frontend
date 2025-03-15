import axios from 'axios';
import BASE_URL from './BaseURL';

export const getStudentNotifications = async () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  console.log("hi")
  if (!token) {
    console.warn("No authentication token found. Please log in again.");
    return [];
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/student/notifications`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true, // In case cookies or session are needed

    });

    console.log('Notification API Response:', data); 
    return Array.isArray(data) ? data : [];

  } catch (error) {
    console.error('Notification API Error:', error.response?.status, error.response?.data || error.message);
    return [];
  }
};
