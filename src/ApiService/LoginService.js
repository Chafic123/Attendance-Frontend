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
        const userID = response.data.user.id;
        if (access_token && userRole && userID) {
            // Extract access token and user role from response data
            console.log('Login Response:', response.data);
            const storage = rememberMe ? localStorage : sessionStorage;

            // Store token and user role
            storage.setItem('authToken', access_token);
            storage.setItem('userRole', userRole.toLowerCase());
            storage.setItem('userID', userID);
            console.log(userID)
            
            return response.data;  
        }

        return null;
    } catch (error) {
        console.log(error);
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || 'Something went wrong!';
    }
};
