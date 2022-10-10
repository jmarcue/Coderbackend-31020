import express from 'express';
import { fileURLToPath } from 'url';
import routerProduct from './routes/product.js';

// puerto
const PORT = process.env.PORT || 8080;
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// ejs
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', routerProduct);

// conexion.
const server = app.listen(PORT, () => {console.log(`The server listening on port ${server.address().port}`)});

// Manejo de errores de conexión
server.on('error', error => console.log(`Error on the server ${error}`));