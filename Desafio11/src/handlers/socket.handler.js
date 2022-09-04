import { Storage } from "../daos/index.js";

const messageStorage = Storage('mongo').message;
const productStorage = Storage('mongo').product;

let userName;

const getUserName = (name) => {
  return userName = name;
};

const socketConfig = async (socket, sockets) => {
  const getProducts = await productStorage.getAll();
  const getMessages = await messageStorage.getAll();

  socket.emit('productForm');
  socket.emit('messages');
  socket.emit('productTable', getProducts);
  socket.emit('chat', getMessages);
  socket.emit('auth', getUserName(userName));
  
  socket.on('addProduct', async product => {
    await productStorage.save(product);
    const products = await productStorage.getAll();
    sockets.emit('productTable', products);
  });  

  socket.on('addMessage', async message => {
    await messageStorage.save(message);
    const messages = await messageStorage.getAll();
    sockets.emit('chat', messages);
  });
};

export { socketConfig , getUserName}