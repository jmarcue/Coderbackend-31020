import express from 'express';
import compression from 'compression'

import infoClass from '../controllers/info.controller.js';

const infoRoute = express.Router();
const info = new infoClass();

console.log(info.getInfo);

infoRoute.get('/', info.getInfo);
infoRoute.get('/gzip', compression(), info.getInfo);

export default infoRoute;