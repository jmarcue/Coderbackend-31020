import Router from 'express';
import cartContainer from "../utils/cartContainer.js";
import productContainer from "../utils/productContainer.js";
import { returnMessage } from "../utils/utils.js";

const routerCart = Router();
// Crea instancias de los contenedores
const cartCntr = new cartContainer('./files/carts.json');
const productCntr = new productContainer('./files/products.json');

// router POST: 'api/carrito/' => Crea un carrito y devuelve su id.
routerCart.post('/', async(req, res) => {
    const result = await cartCntr.save({ products: [] });    
    (result.status === "success")
      ? res.status(200).json(result)
      : res.status(400).json(result);    
});

// router POST: 'api/carrito/:id/productos' => incorpora productos al carrito por su id de producto.
routerCart.post('/:id/productos', async(req, res) => {
  const id = Number(req.params.id);
  const bodyProducts = req.body.products.map(Number);  
  const allProducts = (await productCntr.getAll()).payload;  
  
  if (allProducts) {
    const foundProducts = await allProducts.filter((product) => bodyProducts.includes(product.id));
    if (foundProducts.length === 0) {
      res.status(404).json(returnMessage(false, "Products not found", null));    
    }
    else {
      const result = await cartCntr.addProductToCartById(id, foundProducts);
      (result.status === "success")
        ? res.status(200).json(result)
        : res.status(400).json(result);    
    }
  }
  else {
    res.status(404).json(returnMessage(false, "Products not found", null));
  } 
});

// router GET: 'api/carrito/:id/productos' => listar todos los productos guardados en el carrito.
routerCart.get('/:id/productos', async(req, res) => {
  const id = Number(req.params.id);

  const result = await cartCntr.getById(id);
  (result.status === "success")
    ? res.status(200).json(result)
    : res.status(400).json(result);
});

// router DELETE: 'api/carrito/:id' => Vacía un carrito y lo elimina. 
routerCart.delete('/:id', async(req, res) => {
  const id = Number(req.params.id);
  
  const result = await cartCntr.deleteById(id);
  (result.status === "success")
    ? res.status(200).json(result)
    : res.status(400).json(result);
});

// router DELETE: '/:id/productos/:id_prod' => Eliminar un producto del carrito por su id de carrito y de producto.
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
  const id = parseInt(req.params.id);
  const productId = parseInt(req.params.id_prod);

  const result = await cartCntr.deleteProductFromCartById(id, productId);
  (result.status === "success")
    ? res.status(200).json(result)
    : res.status(400).json(result);
  
});

export default routerCart;
