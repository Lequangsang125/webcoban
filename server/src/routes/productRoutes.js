import express from 'express';
import { createProduct, getProductById, getProducts, removeProduct, updateProduct } from '../controllers/productController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const productRouter = express.Router();

productRouter.get('/',authenticate, getProducts);
productRouter.post('/',authenticate,authorize('admin'), createProduct);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', removeProduct);

export default productRouter;
