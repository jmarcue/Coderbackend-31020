import Router from 'express';
import { getForm } from '../controllers/form.controller.js'

const formRoute = Router();

formRoute.get('/', getForm);

export { formRoute }