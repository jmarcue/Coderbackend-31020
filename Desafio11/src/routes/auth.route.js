import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';

const loginRoute = express.Router();
const logoutRoute = express.Router();


loginRoute.post('/in', login);
logoutRoute.post('/out', logout);

export { loginRoute, logoutRoute }