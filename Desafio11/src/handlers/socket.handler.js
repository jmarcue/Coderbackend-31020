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
    console.log(product);

    await productStorage.save(product);
    sockets.emit('productTable', await productStorage.getAll());
  });  

  socket.on('addMessage', async message => {
    await messageStorage.save(message);
    sockets.emit('chat', await messageStorage.getAll());
  });
};

export { socketConfig , getUserName}