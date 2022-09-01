import Router from 'express';
import { getMessage } from '../controllers/message.controller.js'

const messageRoute = Router();

messageRoute.get('/', getMessage);

export { messageRoute }
