import express from 'express';
import messageController from '../controllers/message.controller.js'

const messageRoute = express.Router();
const message = new messageController();

messageRoute.post('/', message.save);
messageRoute.get('/', message.getAll);

export default messageRoute;