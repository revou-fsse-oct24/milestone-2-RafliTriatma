import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/auth/login';

export const fetchDataWithAuth = async (email: String, password: String) => {
    try {
        const response = await axios.post(API_URL, {
          email,
          password,
        });
    
        // Adding Access Token
        const accessToken = response.data.access_token;
    
        // Save to Local Storage
        localStorage.setItem('authToken', accessToken);
    
        // Callback Token
        return accessToken;
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    };

