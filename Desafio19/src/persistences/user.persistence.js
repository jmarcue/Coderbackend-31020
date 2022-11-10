import { logger } from '../utils/winston.util.js';

userInfo = [];

async function mainGetPersistance(userName, photo) {
  try {
    userInfo.push(await userName, photo);
  }
  catch (error) {
    logger.error.error(error);
  }
}

async function logoutPersistence() {
  try {
    return userInfo;
  }
  catch (error) {
    logger.error.error(error);
  }
}

export { 
  mainGetPersistance,
  logoutPersistence
};
