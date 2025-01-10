import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CardProduct from '@/components/CardProduct';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Get API
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Get Product by Categories
  const fetchProductsByCategory = async (categoryId: number | null) => {
    setLoading(true);
    try {
      const response = await fetch(
        categoryId
          ? `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
          : 'https://api.escuelajs.co/api/v1/products'
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  // Rendering Get Categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number | null) => {
    if (selectedCategory === categoryId) {
      return;
    }
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div>
        <div className="flex justify-center gap-4 mt-4">
          {/* Display Categories */}
          {categories.map((category) => (
            <Link
              key={category.id}
              to="#"
              onClick={() => handleCategoryClick(category.id)}
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-4">
            {products.length > 0 ? (
              <CardProduct products={products} />
            ) : (
              <p>No products found for this category.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
