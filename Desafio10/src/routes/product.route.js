import express from 'express';
import { getProduct } from '../controllers/product.controller.js'

const productRoute = express.Router();

productRoute.get('/', getProduct);

export { productRoute }