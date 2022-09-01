import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import { __dirJoin, jsonTestData, printObject, getMongoObjectId } from "./utils/helper.util.js";
import { Storage } from "./daos/index.js";
import { normalize, schema, denormalize } from 'normalizr';
// routes
import { homeRoute } from "./routes/home.route.js";
import { formRoute } from "./routes/form.route.js";
import { loginRouteGet, loginRoutePost } from "./routes/login.route.js";
import { messageRoute } from "./routes/message.route.js";
import { fakerRoute } from "./routes/faker.route.js";

import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));


// Port.
const PORT = process.env.PORT || 8080;

// Express.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Io
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('./public'));
app.use(express.static('../../files'));


// ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');
//app.use(express.static(__dirJoin(__dirname, '../public')));
//app.use(express.static(__dirJoin(__dirname, '../../files')));
//app.set('views', __dirJoin(__dirname, '/views'));
//app.set('view engine', 'ejs');


app.use('/', homeRoute);
app.use('/form', formRoute);
app.use('/login', loginRouteGet);
app.use('/login', loginRoutePost);
app.use('/message', messageRoute);
app.use('/api/products-test', fakerRoute);



//const srv = httpServer.listen(PORT, () => console.log(`Servidor escuchando el puerto ${PORT}`));
const srv = app.listen(PORT, () => {console.log(`Servidor escuchando el puerto ${srv.address().port}`)});

// conexion (app->server).
//const srv = app.listen(PORT, () => {console.log(`The server listening on port ${srv.address().port}`)});

// Manejo de errores de conexión
srv.on('error', error => console.log(`Error on the server ${error}`));


// storage
const messageStorage = Storage('mongo').message;
const productStorage = Storage('mysql').product;
let users = [];

// socket products
io.on('connection', socket => {
  socket.on('sendProduct', async () => {
    try {
      const allProducts = await productStorage.getAll();
      socket.emit('allProducts', allProducts);
    }
    catch(err) {
      console.log(`Error ${err}`);
    }
  });
  
  socket.on('addProducts', async data => {
    try {
      const newProducto = {
        title: `${data.name}`,
        price: Number(data.price),
        thumbnail: `${data.thumbnail}`
      };

      const product = await productStorage.save(newProducto);
      io.sockets.emit('refreshTable', [product]);
    }
    catch(err) {
      console.log(`Error ${err}`);
    }
  });
});

// socket messages
io.on('connection', socket => {
  socket.on('joinChat', async ({ userName }) => {
    users.push({
      id: socket.id,
      userName: userName,
      avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
    });
    
    socket.emit('notification', `Bienvenido ${userName}`);
    try {
        const allMessages = await messageStorage.getAll();

        jsonNormalizer(jsonTestData);

        socket.emit('allMenssage', allMessages);
    }
    catch (err) {
      return res.status(404).json({ error: `Error ${err}` });
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
        nombre: 'Hard-code: User Name',
        apellido: 'Hard-code: User Last Name',
        alias: 'Hard-code: User Alias',
        edad: 'Hard-code: Age',
        avatar: 'Hard-code: User Url Avatar'
      },
      text: {
        id: getMongoObjectId,
        mensaje: data,
      }
    }
    await storageMessages.save(newMessage);
    
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


const jsonNormalizer = (jsonData) => {
  const authorSchema = new schema.Entity('author');
  const textSchema = new schema.Entity('text');
  const messageSchema = new schema.Entity('mensaje', {
      author: authorSchema,
      mensaje: textSchema,
  });

  const messagesSchema = new schema.Entity('chat', {
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