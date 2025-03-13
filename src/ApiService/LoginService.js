import axios from 'axios';

const BASE_URL = 'http://localhost:8001/api/auth/';

export const loginUser = async (identifier, password, rememberMe = false) => {
    try {
        const payload = { identifier, password, remember_me: rememberMe };

        console.log('Login Payload:', payload);
        const response = await axios.post(`${BASE_URL}login`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        
        const { access_token, status: userRole } = response.data || {};

        if (access_token && userRole) {
            // Extract access token and user role from response data
            console.log('Login Response:', response.data);
            const storage = rememberMe ? localStorage : sessionStorage;

            // Store token and user role
            storage.setItem('authToken', access_token);
            storage.setItem('userRole', userRole.toLowerCase());

            return response.data;  
        }

        return null;
    } catch (error) {
        console.log(error);
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || 'Something went wrong!';
    }
};
