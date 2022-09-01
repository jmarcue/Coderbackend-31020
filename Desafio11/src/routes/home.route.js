import express from 'express';
import { home } from '../controllers/home.controller.js'

const homeRoute = express.Router();

homeRoute.get('/', home);

export { homeRoute }