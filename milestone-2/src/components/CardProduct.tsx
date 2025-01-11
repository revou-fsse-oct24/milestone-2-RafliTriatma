import React, { useState, useEffect } from 'react';
import { fetchProduct } from '../services/ProductApi';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const Card: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProduct();
        setProducts(data);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const addToCart = (product: Product) => {
    // Check if there's an existing cart in localStorage
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Add new product to cart
    cart.push(product);

    // Save updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Navigate to cart page
    navigate('/cart');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {/* Renderin Product in Card */}
      {products.map((product) => (
        
        <div
          key={product.id}
          className="w-full h-[400px] flex flex-col border border-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />

          <div className="flex flex-col p-4 flex-1">
            <h3 className="text-xl font-semibold text-gray-800 truncate">{product.title}</h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
              {product.description}
            </p>

            {/* Harga produk */}
            <p className="mt-2 text-lg font-bold text-gray-900">${product.price}</p>

            {/* Tombol (optional) */}
            <button 
            onClick={() => addToCart(product)}
            className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Card;
