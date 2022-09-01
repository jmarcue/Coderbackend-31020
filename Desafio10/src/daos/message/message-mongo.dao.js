import { mongoConfig } from "../../config/mongo.config.js";
import { messageModel } from "../../models/message.model.js";
import messageMongoContainer from "../../containers/mongo/message-mongo.container.js";

class messageMongoDao extends messageMongoContainer {
  constructor() {
    super(mongoConfig, messageModel);
  };
};

export default messageMongoDao;