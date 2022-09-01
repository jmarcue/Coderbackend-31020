import { getUserName } from '../handlers/socket.handler.js';
import { __dirname, __dirJoin } from '../utils/helper.util.js';

const userAuth = (req, res, next) => {
  //console.log(req.session);
  if (req.session?.nombre !== undefined) {
    getUserName(req.session.nombre);
    next();
  }
  else {
    res.sendFile(__dirJoin(__dirname, '../public/auth.html'));
  }
};

export { userAuth }