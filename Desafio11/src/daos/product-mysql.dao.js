import { mysqlConfig } from '../config/mysql.config.js';
import productMysqlContainer from '../containers/product-mysql.container.js';

class productMysqlDao extends productMysqlContainer {
  constructor() {
    super(mysqlConfig, 'products');
  };
};

export default productMysqlDao;