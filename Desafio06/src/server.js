import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import Container from './utils/container.js';

// Port
const PORT = process.env.PORT || 8080;
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// message & product
const message = new Container("message.json");
const product = new Container("product.json");

// Io
const server = http.createServer(app);
const io = new Server(server);

// handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'  
}));
app.set('views', './src/views');
app.set('view engine', 'hbs');

// Socket
io.on('connection', async(socket) => {
  console.log('Usuario conectado');
  
  const messages = await message.getAll();
  socket.emit('messageList', messages);  
  
  socket.on('messageAdd', async(data) => {
    await message.save(data);
  
    const messages = await message.getAll();
    io.sockets.emit('messageList', messages);
  });

  const products = await product.getAll();
  socket.emit('productList', products );

  socket.on('productAdd', async(data) => {
    await product.save(data);
  
    const products = await product.getAll();
    io.sockets.emit('productList', products);
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