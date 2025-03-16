import axios from 'axios';
import BASE_URL from './BaseURL';

export const getStudentSchedule = async () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    console.warn("No authentication token found. Please log in again.");
    return null;
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/student/schedule-report`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true, 
    });

    console.log('Student Schedule API Response:', data);
    return data;

  } catch (error) {
    console.error('Student Schedule API Error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};
