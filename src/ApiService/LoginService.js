import axios from 'axios';
import BASE_URL from './BaseURL';

export const loginUser = async (identifier, password, rememberMe = false) => {
    try {
        const payload = { identifier, password, remember_me: rememberMe };

        console.log('Login Payload:', payload);
        const response = await axios.post(`${BASE_URL}/auth/login`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        
        const { access_token, status: userRole } = response.data || {};
        console.log("status: ", userRole)
        if (access_token && userRole) {
            console.log('Login Response:', response.data);
            const storage = rememberMe ? localStorage : sessionStorage;

            storage.setItem('authToken', access_token);
            storage.setItem('userRole', userRole.toLowerCase()); 
            console.log("Stored userRole:", storage.getItem('userRole'));

            return response.data;  
        }

        return null;
    } catch (error) {
        console.log(error);
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || 'Something went wrong!';
    }
};


export const resetPassword = async (personal_email) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/password/reset`, { personal_email }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
  
      console.log("Reset Password Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data || error.message);
      throw error.response?.data || 'Something went wrong!';
    }
  };

  