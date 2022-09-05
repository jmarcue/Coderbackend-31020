import express from 'express';
import messageController from '../controllers/message.controller.js'

const messageRoute = express.Router();
const message = new messageController();

messageRoute.post('/', message.messageSave);
messageRoute.get('/', message.messageGetAll);

export default messageRoute;