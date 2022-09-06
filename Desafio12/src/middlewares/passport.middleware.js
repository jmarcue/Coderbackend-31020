import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { userModel } from '../models/user.model.js';


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('register', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
  }, 
  async function (req, username, password, done) {
    try {
      const { username, password } = req.body;
      const userExists = await userModel.findOne({ username: username });
      
      if (userExists) {
        return done(null, false, req.flash('error', 'Usuario ya registrado'));
      }
      else {
        const newUser = new userModel({ username, password })
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        return done(null, newUser, req.flash('success','Usuario registrado con éxito'));
      }
    }
    catch (error) {
      console.log(error);
    }
}));

passport.use('login', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
  },
  async (req, username, password, done) => {
    try {
      const { username, password } = req.body
      const userRegistered = await userModel.findOne({ username: username });

      if (!userRegistered) {
        return done(null, false, req.flash('error', 'Usuario y/o contraseña inválido'));
      }
      else {
        const matchPassword = await userRegistered.checkPassword(password);
        if (matchPassword) {
          return done(null, userRegistered, req.flash('welcome', `${username}`));
        }
        else {
          return done(null, false, req.flash('error', 'Usuario y/o contraseña inválido'));
        }
      }
    } catch (error) {
      console.log(error);
    }
}));

export default passport;