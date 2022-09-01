import Router from 'express';
import { getLogin } from '../controllers/login.controller.js'
import { userLogin } from '../controllers/userLogin.controller.js'

const loginRouteGet = Router();
const loginRoutePost = Router();

loginRouteGet.get('/', getLogin);
loginRoutePost.post('/', userLogin);


export { loginRouteGet, loginRoutePost }