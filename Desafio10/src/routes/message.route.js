import express from 'express';
import { getMessage } from '../controllers/message.controller.js'

const messageRoute = express.Router();

messageRoute.get('/', getMessage);

export { messageRoute }
