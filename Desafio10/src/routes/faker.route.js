import Router from 'express';
import { getFaker } from '../controllers/faker.controller.js'

const fakerRoute = Router();

fakerRoute.get('/', getFaker);

export { fakerRoute }