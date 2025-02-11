import axios from 'axios';

const BASE_URL = 'https://e4cd-185-26-85-248.ngrok-free.app/api/auth/'; //hydal server ha w2fo hlaa 

export const loginUser = async (identifier, password, rememberMe = false) => {
    try {
        const payload = { identifier, password, remember_me: rememberMe };

        const response = await axios.post(`${BASE_URL}login`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const { access_token } = response.data || {};

        if (access_token) {
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('authToken', access_token);
            return response.data;  
        }

        return null;
    } catch (error) {
        console.error("Login Error:");
        throw error.response?.data || 'Something went wrong!';
    } 
    //3malouha btri2a mrttbe hy bs checker
};
