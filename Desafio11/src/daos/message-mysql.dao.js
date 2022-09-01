import { mysqlConfig } from '../config/mysql.config.js';
import messageMysqlContainer from '../containers/message-mysql.container.js';

class messageMysqlDao extends messageMysqlContainer {
  constructor() {
    super(mysqlConfig, 'messages');
  };
};

export default messageMysqlDao;