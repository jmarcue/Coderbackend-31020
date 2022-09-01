import { sqliteConfig } from "../../config/sqlite.config.js";
import messageSqliteContainer from "../../containers/sqlite/message-sqlite.container.js";

class messageSqliteDao extends messageSqliteContainer {
  constructor() {
    super(sqliteConfig, 'messages');
  };
};

export default messageSqliteDao;