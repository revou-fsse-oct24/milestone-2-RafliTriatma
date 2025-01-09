import axios from 'axios';

// URL API
const API_URL = 'https://api.escuelajs.co/api/v1/auth/login';

// Fungsi untuk login
export const fetchLoginUser = async (email: string, password: string) => {
  try {
    // Mengirimkan data login ke API
    const response = await axios.post(API_URL, {
      email: email,
      password: password,
    });

    // Jika request berhasil, kita ambil token dan kembalikan
    return response.data.access_token;
  } catch (error) {
    // Menangani error jika ada
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data || 'Login failed');
    } else {
      return Promise.reject('Unexpected error');
    }
  }
};
