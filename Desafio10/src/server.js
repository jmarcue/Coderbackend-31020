import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import { Storage } from "./daos/index.js";
import { normalize, schema, denormalize } from 'normalizr';
import { printObject, getMongoObjectId, __dirname, __dirJoin } from "./utils/helper.util.js";
import { jsonTestData } from "./utils/sample-data.util.js";
// routes
import { homeRoute } from "./routes/home.route.js";
import { formRoute } from "./routes/form.route.js";
import { loginRouteGet, loginRoutePost } from "./routes/login.route.js";
import { messageRoute } from "./routes/message.route.js";
import { fakerRoute } from "./routes/faker.route.js";

// Port.
const PORT = process.env.PORT || 8080;

// Express.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirJoin(__dirname, '../public')));
app.use(express.static(__dirJoin(__dirname, '../files')));

// Io
const server = http.createServer(app);
const io = new Server(server);

// ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', homeRoute);
app.use('/form', formRoute);
app.use('/login', loginRouteGet);
app.use('/login', loginRoutePost);
app.use('/message', messageRoute);
app.use('/api/products-test', fakerRoute);

// conexion.
const srv = server.listen(PORT, () => {console.log(`Servidor escuchando el puerto ${srv.address().port}`)});

// Manejo de errores de conexión
srv.on('error', error => console.log(`Error en el servidor ${error}`));

// storage
const messageStorage = Storage('mongo').message;
const productStorage = Storage('mysql').product;
let users = [];

// socket messages
io.on('connection', socket => {
  socket.on('joinMessage', async ({ userName }) => {
    users.push({
      id: socket.id,
      userName: userName,
      avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
    });
    
    socket.emit('notification', `Bienvenido ${userName}`);
    try {
        const allMessageStorage = await messageStorage.getAll();

        jsonNormalizer(jsonTestData);
        
        socket.emit('allMessage', allMessageStorage);
    }
    catch (err) {
      console.log(`Error ${err}`);
    }

    socket.broadcast.emit('notification', `${userName} se ha unido al chat`);
    io.sockets.emit('users', users);
  });

  socket.on('messageInput', async data => {
    const user = users.find(user => user.id === socket.id);
    const newMessage = {
      id: user.userName,
      author: {
        id: user.userName,
        nombre: 'User Name',
        apellido: 'User Last Name',
        alias: 'User Alias',
        edad: 'Age',
        avatar: 'User Url Avatar'
      },
      text: {
        id: getMongoObjectId,
        mensaje: data,
      }
    }
    await messageStorage.save(newMessage);
    
    socket.emit('message', newMessage);
    socket.broadcast.emit('message', newMessage);
  });

  socket.on('disconnect', reason => {
    const user = users.find(user => user.id === socket.id);
    users = users.filter(user => user.id !== socket.id);
    if (user) {
          socket.broadcast.emit('notification', `${user.userName} se ha ido del chat`);
    }

    io.sockets.emit('users', users);
  });
});

// socket products
io.on('connection', socket => {
  socket.on('saveProduct', async data => {
    try {
      const newProduct = {
        name: `${data.name}`,
        price: Number(data.price),
        thumbnail: `${data.thumbnail}`
      };

      const product = await productStorage.save(newProduct);
      io.sockets.emit('refreshTable', [product]);
    }
    catch(err) {
      console.log(`Error ${err}`);
    }
  });

  socket.on('sendProduct', async () => {
    try {
      const allProducts = await productStorage.getAll();
      socket.emit('allProducts', allProducts);
    }
    catch(err) {
      console.log(`Error ${err}`);
    }
  });
});

const jsonNormalizer = (jsonData) => {
  const authorSchema = new schema.Entity('author');
  const textSchema = new schema.Entity('text');
  const messageSchema = new schema.Entity('mensaje', {
      author: authorSchema,
      mensaje: textSchema,
  });

  const messagesSchema = new schema.Entity('message', {
      mensajes: [messageSchema]
  });

  const normalizedMessages = normalize(jsonData, messagesSchema);
  const denormalizedMessages = denormalize(normalizedMessages.result, messagesSchema, normalizedMessages.entities);

  console.log('Original');  
  console.log(`Tamaño [bytes]: ${JSON.stringify(jsonData).length}`);
  printObject(jsonData);

  console.log('Normalizado');
  console.log(`Tamaño [bytes]: ${JSON.stringify(normalizedMessages).length}`);
  printObject(normalizedMessages);

  console.log('Desnormalizado');
  console.log(`Tamaño [bytes]: ${JSON.stringify(denormalizedMessages).length}`);
  printObject(denormalizedMessages);
}