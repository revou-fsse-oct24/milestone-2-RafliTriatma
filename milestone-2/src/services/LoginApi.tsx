import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/auth/login';

export const fetchDataWithAuth = async (email: String, password: String) => {
    try {
        const response = await axios.post(API_URL, {
          email,
          password,
        });
    
        // Mendapatkan access_token dari respons
        const accessToken = response.data.access_token;
    
        // Menyimpan token ke localStorage
        localStorage.setItem('authToken', accessToken);
    
        // Mengembalikan token
        return accessToken;
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    };

