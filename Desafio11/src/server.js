
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { serverEnv } from './config/server.config.js';
import { socketConfig } from './handlers/socket.handler.js';
import { userAuth } from './middlewares/auth.middleware.js';
import { __dirname, __dirJoin } from './utils/helper.util.js';

// routes
import { homeRoute } from "./routes/home.route.js";
import { authRoute } from "./routes/auth.route.js";

// Port.
const PORT = process.env.PORT || 8080;

// Express.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirJoin(__dirname, '../public')));

// Io
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', async socket => {
  socketConfig(socket, io.sockets);
});

// handlebars
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('views', __dirJoin(__dirname, '../views'));
app.set('view engine', 'hbs');

/*
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: __dirJoin(__dirname, '../views/layouts'),
  partialsDir: __dirJoin(__dirname, '../views/partials')
}));
app.set('views', __dirJoin(__dirname, '../views'));
app.set('view engine', 'hbs');
*/

// Cookie
app.use(cookieParser());

// Session
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};
app.use(session({
  store: MongoStore.create({
      mongoUrl: serverEnv.MONGO_ATLAS,
      mongoOptions: advancedOptions,
      ttl: 60,
      collectionName: 'sessions'
  }),
  secret: '123456',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge:60000
  }  
}));

// routes
app.use('/auth', authRoute)
app.use('/', userAuth, homeRoute);


// conexion.
const srv = server.listen(PORT, () => {console.log(`Servidor escuchando el puerto ${srv.address().port}`)});

// Manejo de errores de conexión
srv.on('error', error => console.log(`Error en el servidor ${error}`));