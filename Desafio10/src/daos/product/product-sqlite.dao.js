import { sqliteConfig } from "../../config/sqlite.config.js";
import productSqliteContainer from "../../containers/sqlite/product-sqlite.container.js";

class productSqliteDao extends productSqliteContainer {
  constructor() {
    super(sqliteConfig, 'products');
  };
};

export default productSqliteDao;