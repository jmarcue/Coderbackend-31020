import express from 'express';
import passport from 'passport';
import userController from '../controllers/user.controller.js'
import { validate } from '../middlewares/auth.middleware.js'

const userRoute = express.Router();
const user = new userController();

userRoute.get('/register', user.registerGet);
userRoute.get('/main', validate, user.mainGet);
userRoute.get('/logout', user.logout);
userRoute.get('/login', user.loginGet);

userRoute.post('/register', passport.authenticate("register", {
  successRedirect: "/user/main",
  failureRedirect: "/user/register"
}));

userRoute.post('/login', passport.authenticate("login", {
  successRedirect: "/user/main",
  failureRedirect: "/user/login"
}));

export default userRoute;