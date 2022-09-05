
import { mongoConnect } from "../config/mongo.config.js";
import { messageModel } from "../models/message.model.js";
import messageContainer from "../containers/message.container.js";

export default class messageDao extends messageContainer  {
  constructor() {
    super(mongoConnect, messageModel);
  };
}