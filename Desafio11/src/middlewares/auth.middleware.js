import { getName } from '../handlers/socket.handler.js';
import { __dirname, __dirJoin } from '../utils/helper.util.js';

const auth = (req, res, next) => {
  if (req.session?.nombre !== undefined) {
    getName(req.session.nombre);
    next();
  }
  else {
    res.sendFile(__dirJoin(__dirname, '../views/home.html'));
  }
};

export { auth }