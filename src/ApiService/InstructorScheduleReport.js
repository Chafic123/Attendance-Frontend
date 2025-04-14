import axios from 'axios';
import BASE_URL from './BaseURL';

export const getInstructorSchedule = async () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    console.warn("No authentication token found. Please log in again.");
    return null;
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/instructor/schedule-report`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return data;

  } catch (error) {
    console.error('Instructor Schedule API Error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};
