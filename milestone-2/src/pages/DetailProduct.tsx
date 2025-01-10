import React, { useState, useEffect } from 'react';

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const API_URL = 'https://api.escuelajs.co/api/v1/products/4';

const DetailProduct: React.FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Error fetching product data');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError('Error fetching product data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailProduct();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Container utama detail produk */}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex p-6">
          {/* Gambar produk */}
          <div className="w-1/2 pr-6">
            {product?.images.length ? (
              <img
                src={product?.images[0]}  // Pastikan gambar ada
                alt={product?.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="text-center text-gray-500">No Image Available</div> 
            )}
          </div>

          {/* Deskripsi produk */}
          <div className="w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{product?.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{product?.description}</p>
            <p className="text-xl font-bold text-gray-900 mb-4">${product?.price}</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
