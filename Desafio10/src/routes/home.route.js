import express from 'express';
import { getHome } from '../controllers/home.controller.js'

const homeRoute = express.Router();

homeRoute.get('/', getHome);

export { homeRoute }