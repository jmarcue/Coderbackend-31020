import Router from 'express';
import { getProduct } from '../controllers/product.controller.js'

const productRoute = Router();

productRoute.get('/', getProduct);

export { productRoute }
