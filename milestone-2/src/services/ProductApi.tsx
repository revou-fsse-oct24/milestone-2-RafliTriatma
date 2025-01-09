import axios from "axios";

const API_URL = 'https://api.escuelajs.co/api/v1/products';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export const fetchProduct = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export default fetchProduct;