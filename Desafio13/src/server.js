import express from 'express';
import { Server as serverHttp } from 'http';
import { Server as ServerIO } from 'socket.io';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash'
import morgan from 'morgan';
import { serverConfig } from './config/server.config.js';


// Server 
const app = express();
const http = new serverHttp(app);
const io = new ServerIO(http);
const PORT = serverConfig.PORT;

// Middlewares
app.use(cookieParser())
app.use(session({
    secret: 'secretKey',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 // tiempo en milisegundos (10 min = 60000 ms * 10)
    }
}));





// server connection
const server = http.listen(PORT, () => {
  console.log(`Servidor http en puerto: ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));