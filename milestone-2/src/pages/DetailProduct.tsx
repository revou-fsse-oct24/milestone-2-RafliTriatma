import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const DetailProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Mengambil ID dari URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/4${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      {product && (
        <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-4 text-lg font-bold text-gray-900">${product.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
