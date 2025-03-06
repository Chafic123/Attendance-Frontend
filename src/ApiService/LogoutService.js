import axios from 'axios';

const BASE_URL = 'https://b5a4-185-26-85-248.ngrok-free.app/auth/';

export const logoutUser = async () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    throw new Error('No token found.');
  }

  try {
    const response = await axios.post(
      `${BASE_URL}logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );


    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    return response.data; // Returns { status: "success", message: "Logged out successfully" }
  } catch (error) {
    console.error('Logout Error:', error.response?.data || error.message);
    throw error.response?.data || 'Logout failed';
  }
};
