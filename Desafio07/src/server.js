import express from 'express';
import routerProduct from './routes/product.js';
import routerCart from './routes/cart.js';
import { __dirname } from "./utils/utils.js";

// Port.
const PORT = process.env.PORT || 8080;

// Express.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));

// router.
app.use('/api/productos', routerProduct);
app.use('/api/carrito', routerCart);

// conexion.
const srv = app.listen(PORT, () => {
  console.log(`The server listening on port ${srv.address().port}`)
});

// Manejo de errores de conexión
srv.on('error', error => console.log(`Error on the server ${error}`));