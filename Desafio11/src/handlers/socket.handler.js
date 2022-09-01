import { Storage } from "../daos/index.js";

const messageStorage = Storage('mongo').message;
const productStorage = Storage('mongo').product;

let logName;

const getName = (name) => {
  return logName = name;
};

const socketConfig = async (socket, sockets) => {
  const getProducts = await productStorage.getAll();
  const getMessages = await messageStorage.getAll();

  socket.emit('formProductos');
  socket.emit('mensajes');
  socket.emit('tablaProductos', getProducts);
  socket.emit('chat', getMessages);
  socket.emit('auth', getName(logName));
  
  socket.on('addProduct', async product => {
    await productStorage.save(product);
    sockets.emit('tablaProductos', await productStorage.getAll());
  });  

  socket.on('addMessage', async message => {
    await messageStorage.save(message);
    sockets.emit('chat', await messageStorage.getAll());
  });
};

export { socketConfig , getName}