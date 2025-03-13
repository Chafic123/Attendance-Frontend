import axios from 'axios';

const BASE_URL = 'https://a95f-185-26-85-248.ngrok-free.app/api/auth/';

export const loginUser = async (identifier, password, rememberMe = false) => {
    try {
        const payload = { identifier, password, remember_me: rememberMe };

        const response = await axios.post(`${BASE_URL}login`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const { access_token, status: userRole } = response.data || {};

        if (access_token && userRole) {
            const storage = rememberMe ? localStorage : sessionStorage;

            // Store token and user role
            storage.setItem('authToken', access_token);
            storage.setItem('userRole', userRole.toLowerCase());

            return response.data;  
        }

        return null;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || 'Something went wrong!';
    }
};
