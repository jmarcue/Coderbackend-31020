import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import containerDatabase from './utils/containerDatabase.js';
import { __dirname } from "./utils/util.js";
import { mysql, sqlite } from './options/config.js';

// Port
const PORT = process.env.PORT || 8080;

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../../public'));

// message & product
const message = new containerDatabase(sqlite, 'messages');
const product = new containerDatabase(mysql,  'products');

// Io
const server = http.createServer(app);
const io = new Server(server);

// handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: __dirname + '../views/layouts',
  partialsDir: __dirname + '../views/partials'  
}));
app.set('views', __dirname + '../views');
app.set('view engine', 'hbs');

// Socket
io.on('connection', async(socket) => {
  console.log('Usuario conectado');
  // carga inicial de mensajes
  socket.emit('messageList', await message.getAll());
  // agrega mensaje
  socket.on('messageAdd', async(data) => {
    await message.save(data);
    io.sockets.emit('messageList', await message.getAll());
  });

  // carga de los productos
  socket.emit('productList', await product.getAll());
  // agrega producto
  socket.on('productAdd', async(data) => {
    await product.save(data);
    io.sockets.emit('productList', await product.getAll());
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

app.get('/', function (req, res) {
  res.redirect('/productos');
});

app.get('/productos', (req, res) => {
  res.render('pages/form', {});
});

app.get('/listaproductos', async (req, res) => {
  const products = await product.getAll();
  res.render('pages/list',  { products } );
});

app.post('/productos', async (req, res) => {
  const object = req.body;
  await product.save(object);
  res.redirect('/productos');
});


// conexion (app->server).
const srv = server.listen(PORT, () => {console.log(`The server listening on port ${srv.address().port}`)});

// Manejo de errores de conexión
srv.on('error', error => console.log(`Error on the server ${error}`));