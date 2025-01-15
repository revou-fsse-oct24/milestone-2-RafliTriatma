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
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));

    navigate('/cart');
  };

  const handleCardClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full h-[400px] flex flex-col border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer"
          onClick={() => handleCardClick(product.id)}
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

            {/* Product Price */}
            <p className="mt-2 text-lg font-bold text-gray-900">${product.price}</p>

            {/* Add to Cart Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation(); 
                addToCart(product);
              }}
              className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;