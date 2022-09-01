import express from 'express';
import { getFaker } from '../controllers/faker.controller.js'

const fakerRoute = express.Router();

fakerRoute.get('/', getFaker);

export { fakerRoute }