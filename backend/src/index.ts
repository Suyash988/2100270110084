import express from 'express';
import productsRouter from './routes/categories/products';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/test/companies', productsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
