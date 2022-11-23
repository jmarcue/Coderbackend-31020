import {mainGetPersistance, logoutPersistence} from '../persistences/user.persistence.js';
import { logger } from '../utils/winston.util.js';

async function mainGetService(userInfo) {
  try {
    const photo = await userInfo.photos[0].value;
    const userName = await userInfo.displayName;
    mainGetPersistance(userName, photo);
  } catch (error) {
    logger.error.error(error);
  }
}

async function logoutService() {
  try {
    const user = await logoutPersistence()      
  }
  catch (error) {
    logger.error.error(error);
  }
}

export {
  mainGetService,
  logoutService
};