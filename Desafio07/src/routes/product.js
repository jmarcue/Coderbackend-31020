import Router from 'express';
import productContainer from "../utils/productContainer.js";
import { returnMessage, authMiddleware } from "../utils/utils.js";

const routerProduct = Router();

// Crea instancias de los contenedores
const productCntr = new productContainer('./files/products.json');

// router POST => api/productos
routerProduct.post('/', authMiddleware, async(req, res) => {
  const product = req.body;
  const result = await productCntr.save(product);
  
  (result.status === "success")
    ? res.status(200).json(result)
    : res.status(400).json(result);
});

// router GET => api/productos
routerProduct.get('/', async(_, res) => {
  const products = await productCntr.getAll();
  (products.status === "success")
    ? res.status(200).json(products)
    : res.status(400).json(products);
})

// router GET => api/productos/:id
routerProduct.get('/:id?', async(req, res) => {
  const id = Number(req.params.id);
  const result = await productCntr.getById(id);

  (result.status === "success")
    ? res.status(200).json(result)
    : res.status(400).json(result);
});

// router PUT => api/productos/:id
routerProduct.put('/:id', authMiddleware, async(req, res) => {
  const id = Number(req.params.id);
  const product = req.body;
  
  const result = await productCntr.updateById(id, product);
  (result.status === "success")
    ? res.status(200).json(result)
    : res.status(404).json(result);
});

// router DELETE => api/productos/:id
routerProduct.delete('/:id', authMiddleware, async(req, res) => {
  const id = Number(req.params.id);
  
  const result = await productCntr.deleteById(id);
  (result.status === "success")
    ? res.status(200).json(result)
    : res.status(404).json(result);
});

export default routerProduct;
