import axios from 'axios';

const BASE_URL = 'https://c8d9-185-26-85-248.ngrok-free.app/api/';

export const getStudentNotifications = async () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    console.warn("No authentication token found. Please log in again.");
    return [];
  }

  try {
    const { data } = await axios.get(`${BASE_URL}student/notifications`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
