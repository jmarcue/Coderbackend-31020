import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';

//const loginRoute = express.Router();
//const logoutRoute = express.Router();
//loginRoute.post('/login', login);
//logoutRoute.post('/logout', logout);
//export { loginRoute, logoutRoute }


const authRoute = express.Router();


authRoute.post('/login', login);
authRoute.post('/logout', logout);


export { authRoute }