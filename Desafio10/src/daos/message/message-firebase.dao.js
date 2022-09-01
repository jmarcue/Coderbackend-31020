import { queryMessage } from "../../config/firebase.config.js";
import messageFirebaseContainer from "../../containers/firebase/message-firebase.container.js";

class messageFirebaseDao extends messageFirebaseContainer {
  constructor() {
    super(queryMessage);
  };
};

export default messageFirebaseDao;