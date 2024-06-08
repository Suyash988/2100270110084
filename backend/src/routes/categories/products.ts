import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

interface Product {
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

  if (!companyname || !categoryname) {
    return res.status(400).json({ error: 'Company name and category name are required' });
  }

  try {
    const apiUrl = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products`;
    const response = await axios.get<Product[]>(apiUrl);
    const products = response.data;

    // Apply price filters
    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    // Sort products by rating and slice the top 'n' products
    const topProducts = filteredProducts.sort((a, b) => b.rating - a.rating).slice(0, top);

    return res.status(200).json(topProducts);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;