import express from 'express';
import { Server as serverHttp } from 'http';
import { Server as serverIO } from 'socket.io';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { __dirname, __dirJoin } from './utils/helper.util.js';
import { serverConfig } from "./config/server.config.js";
import { mongoConnect } from "./config/mongo.config.js";

// routes
import messageRoute from './routes/message.route.js';


// config server
const app = express();
const http = new serverHttp(app);
const io = new serverIO(http);
const PORT = serverConfig.PORT;

mongoConnect
  .then(() => { console.log('Conectado a Mongoose') },
    err => { err }
  );

// Middlewares
app.use(cookieParser());
// maxAge & ttl: tiempo en milisegundos => 10 min = 60000 ms * 10
app.use(session({
    secret: '12345',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 
    },
    store: MongoStore.create({
      mongoUrl: serverConfig.MONGO_ATLAS,
      mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
      ttl: 60000,
      collectionName: 'sessions'
    }),    
}));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Endpoints
app.use('/mensajes', messageRoute);
// app.get('/', function (req, res) { res.render('index') });

// statics files
app.use(express.static(__dirJoin(__dirname, '../public')));
app.set('views', __dirJoin(__dirname, '../views'));
app.set('view engine', 'ejs');

// Import controllers.


// Web Sockets
let chat = [];
io.on('connection', socket => {
  console.log(`Cliente ID:${socket.id} inició conexión`);
  io.sockets.emit('new-message-server', chat);

  socket.on('new-message', async data => {
    const message = await data;
    chat.push(data);
    msg.addMsg({ message });
    io.sockets.emit('new-message-server', chat)
  });

  socket.on('new-product', async data => {
    const producto = await data;
    prodClass.add({ producto });
    io.sockets.emit('new-prod-server', producto);
  });
});

// server
const server = http.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto: ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));