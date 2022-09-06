import express from 'express';
import productController from '../controllers/message.controller.js'

const productRoute = express.Router();
const product = new productController();

productRoute.post('/', product.save);
productRoute.get('/', product.getAll);

export default productRoute;