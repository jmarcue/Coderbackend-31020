import express from 'express';
import { getLogin } from '../controllers/login.controller.js'
import { userLogin } from '../controllers/login-user.controller.js'

const loginRouteGet = express.Router();
const loginRoutePost = express.Router();

loginRouteGet.get('/', getLogin);
loginRoutePost.post('/', userLogin);

export { loginRouteGet, loginRoutePost }