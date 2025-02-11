import axios from 'axios';
// there're some errors + edit the routes in app 
const BASE_URL = 'https://e4cd-185-26-85-248.ngrok-free.app/api/auth/';

export const logout = async () => {
  try {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
      console.log('No token found, skipping logout');
      return;
    }

    const response = await axios.post(
      `${BASE_URL}logout`, 
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      }
    );

    localStorage.removeItem('authToken'); 

    window.location.href = '/Login';

    console.log(response.data.message); 

  } catch (error) {
    console.error("Logout Error:", error.response ? error.response.data : error);
  }
};
