import { GetServerSideProps } from 'next';
import Link from 'next/link';

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

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <a className="text-blue-500 underline mb-4 inline-block">Get back to home</a>
      </Link>
      <div className="border p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700">Company: {product.companyName}</p>
        <p className="text-gray-700">Category: {product.category}</p>
        <p className="text-gray-700">Price: ${product.price}</p>
        <p className="text-gray-700">Rating: {product.rating} / 5</p>
        <p className="text-gray-700">Discount: {product.discount}%</p>
        <p className={`text-gray-700 ${product.availability ? 'text-green-500' : 'text-red-500'}`}>
          Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params!;
  const response = await fetch(`http://localhost:3000/test/companies/companyname/categories/categoryname/products/${productId}`);
  const product = await response.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;