import express from 'express';
import { createProduct, getProductById, getProducts, removeProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', createProduct);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', removeProduct);

export default productRouter;
