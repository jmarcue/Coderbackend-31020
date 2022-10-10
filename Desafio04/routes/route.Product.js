const Router = require('express');
const Product = require('../classes/class.Product.js');

const router = Router();

router.get('/productos', (req, res) => {
     res.send(Product.products);
});

router.get('/productos/:id', (req, res) => {
     const product = getProduct(req.params.id);

     if (product) {
          res.send(product);
     } else {
          res.status(404).send({ error: 'Producto no encontrado' });
     }
 });

router.post('/productos', (req, res) => {
     const { title, price, thumbnail } = req.body;
     const product = { title, price, thumbnail };
     
     const index = getMaxId() + 1; 
     product.id = index;
     Product.products.push(product);
     res.send(getProduct(index));
});

router.put('/productos/:id', (req, res) => {
     const { title, price, thumbnail } = req.body;
     const index = getProductIndex(req.params.id);

     if (index >= 0) {
          Product.products[index] = { title, price, thumbnail };
          Product.products[index].id = Number(req.params.id);
          res.send(Product.products[index]);
     } else {
          res.status(404).send({ error: 'Producto no encontrado' });
     }
});

router.delete('/productos/:id', (req, res) => {
     const index = getProductIndex(req.params.id);     
     
     if (index >= 0) {
          Product.products.splice(index, 1);
         res.send({ message: 'Producto eliminado' });
     } else {
         res.status(404).send({ error: 'Producto no encontrado' });
     }
 });
 

 const getProductIndex = (id) => {  
     return Product.products.findIndex(product => product.id === Number(id));
};

const getProduct = (id) => {
     return Product.products.find(product => product.id === Number(id));
};

const getMaxId = () => {
     return parseInt(Product.products.reduce((prev, curr) => {return (prev = prev > curr.id ? prev : curr.id); }, 0));
};

module.exports = router;