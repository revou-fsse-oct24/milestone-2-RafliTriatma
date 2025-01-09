import React, { useState, useEffect } from 'react';
import { fetchProduct } from '../services/ProductApi';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {/* Render produk di dalam card */}
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full h-[400px] flex flex-col border border-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
          {/* Gambar produk */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />

          <div className="flex flex-col p-4 flex-1">
            {/* Judul produk */}
            <h3 className="text-xl font-semibold text-gray-800 truncate">{product.title}</h3>

            {/* Deskripsi produk*/}
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
              {product.description}
            </p>

            {/* Harga produk */}
            <p className="mt-2 text-lg font-bold text-gray-900">${product.price}</p>

            {/* Tombol (optional) */}
            <button className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500">
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
