import { mysqlConfig } from '../config/mysql.config.js';
import messageMysqlContainer from '../containers/message-mysql.container.js';

class messageMysqlDao extends messageMysqlContainer {
  constructor() {
    super(mysqlConfig, 'message');
  };
};

export default messageMysqlDao;