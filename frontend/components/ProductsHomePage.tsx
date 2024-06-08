'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  companyName: string;
  category: string;
  price: number;
  rating: number;
  discount: number;
  availability: boolean;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/test/companies/companyname/categories/categoryname/products?top=5&minPrice=0&maxPrice=1000');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <a className="border p-4 rounded-lg shadow-lg block">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">Company: {product.companyName}</p>
              <p className="text-gray-700">Category: {product.category}</p>
              <p className="text-gray-700">Price: ₹{product.price}</p>
              <p className="text-gray-700">Rating: {product.rating} / 5</p>
              <p className="text-gray-700">Discount: {product.discount}%</p>
              <p className={`text-gray-700 ${product.availability ? 'text-green-500' : 'text-red-500'}`}>
                Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;