import { mysqlConfig } from "../../config/mysql.config.js";
import productMysqlContainer from "../../containers/mysql/product-mysql.container.js";

class productMysqlDao extends productMysqlContainer {
  constructor() {
    super(mysqlConfig, 'products');
  };
};

export default productMysqlDao;