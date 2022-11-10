import mongoConnect from "../configs/mongo.config.js";
import { logger } from '../utils/winston.util.js';
//import { messageModel } from "../models/message.model.js";

class messageBase {
  constructor() {
    this.cxn = new mongoConnect();
  }

  async addMsgPersistence(mensaje) {
    try {
      const newMsg = await messageModel.create(mensaje);
      return newMsg;
    }
    catch (error) {
      logger.error.error(error);
    }
  }

  async findAllMsgPersistence() {
    try {
      const mensajes = await messageModel.find();
      return mensajes;
    } catch (error) {
      logger.error.error(error);
    }
  }
}

export default messageBase;

