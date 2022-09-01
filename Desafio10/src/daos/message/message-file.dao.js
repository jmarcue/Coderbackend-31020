import fs from "fs";
import { __dirname, __dirJoin } from "../../utils/helper.util.js";
import messageFileContainer from "../../containers/file/message-file.container.js";

class messageFileDao extends messageFileContainer {
  constructor() {
    let filePath = __dirJoin(__dirname, '../../files', 'message.json');
    super(filePath, fs);
  };
};

export default messageFileDao;