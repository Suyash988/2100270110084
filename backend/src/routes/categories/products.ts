import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

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

router.get('/:companyname/categories/:categoryname/products', async (req: Request, res: Response) => {
  const { companyname, categoryname } = req.params;
  const top = parseInt(req.query.top as string, 10) || 10;
  const minPrice = parseFloat(req.query.minPrice as string) || 0;
  const maxPrice = parseFloat(req.query.maxPrice as string) || Infinity;
  const rating = parseFloat(req.query.rating as string) || 0;
  const availability = req.query.availability === 'true';
  const sortBy = req.query.sortBy || 'price';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  if (!companyname || !categoryname) {
    return res.status(400).json({ error: 'Company name and category name are required' });
  }

  try {
    const apiUrl = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products`;
    const response = await axios.get<Product[]>(apiUrl);
    const products = response.data;

    // Apply filters
    let filteredProducts = products
      .filter(product => product.price >= minPrice && product.price <= maxPrice)
      .filter(product => product.rating >= rating)
      .filter(product => (req.query.availability ? product.availability === availability : true));

    // Apply sorting
    if (sortBy) {
      filteredProducts = filteredProducts.sort((a, b) => (a[sortBy] > b[sortBy] ? sortOrder : -sortOrder));
    }

    // Pagination
    const total = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

    return res.status(200).json({ total, products: paginatedProducts });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch the products' });
  }
});

export default router;