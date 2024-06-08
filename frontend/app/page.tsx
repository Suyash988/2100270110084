import React from 'react';

interface Product {
  name: string;
  companyName: string;
  category: string;
  price: number;
  rating: number;
  discount: number;
  availability: boolean;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://api.example.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const HomePage: React.FC = async () => {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">Company: {product.companyName}</p>
            <p className="text-gray-700">Category: {product.category}</p>
            <p className="text-gray-700">Price: ${product.price}</p>
            <p className="text-gray-700">Rating: {product.rating} / 5</p>
            <p className="text-gray-700">Discount: {product.discount}%</p>
            <p className={`text-gray-700 ${product.availability ? 'text-green-500' : 'text-red-500'}`}>
              Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;