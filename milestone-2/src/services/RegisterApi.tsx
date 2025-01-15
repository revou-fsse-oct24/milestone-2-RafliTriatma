import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/users/';

export const createUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(API_URL, {
            name,
            email,
            password,
        });

        const newUser = response.data;
        localStorage.setItem('newUser', JSON.stringify(newUser));

        return newUser;
    } catch (error) {
        console.error('Error during user creation:', error);
        throw error;
    }
};
