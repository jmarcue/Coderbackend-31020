import express from 'express';
import Product from '../utils/product.js';

const router = express.Router();

const getMaxId = () => {
  return parseInt(Product.products.reduce((prev, curr) => {return (prev = prev > curr.id ? prev : curr.id); }, 0));
};

router.get('/', function (req, res) {
  res.redirect('/productos');
});

router.get('/productos', (req, res) => {
  res.render('form');
});

router.get('/listaproductos', (req, res) => {
  res.render('product',  { Product }  );
});

router.post('/productos', (req, res) => {
  const { name, price, url } = req.body;
  
  if (name || price || url) {
    const product = { name, price, url };
    const index = getMaxId() + 1; 
    product.id = index;
    Product.products.push(product);
  }
  res.redirect('/productos');
});

export default router;