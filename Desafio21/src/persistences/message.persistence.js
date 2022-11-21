import messageModel from "../models/message.model.js";
import messageBase from '../repositories/message.repository.js';
import { logger } from '../utils/winston.util.js';

class messagePersistence extends messageBase {
  async normalizedDataPersistence() {
    try {
      const messages = await messageModel.find();
      return messages;
    }
    catch (error) {
      logger.error.error(error);
    }
  }
}

export default messagePersistence;