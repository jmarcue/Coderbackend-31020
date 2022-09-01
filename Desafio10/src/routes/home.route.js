import Router from 'express';
import { getHome } from '../controllers/home.controller.js'

const homeRoute = Router();

homeRoute.get('/', getHome);

export { homeRoute }