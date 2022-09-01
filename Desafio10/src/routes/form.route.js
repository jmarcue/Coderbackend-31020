import express from 'express';
import { getForm } from '../controllers/form.controller.js'

const formRoute = express.Router();

formRoute.get('/', getForm);

export { formRoute }