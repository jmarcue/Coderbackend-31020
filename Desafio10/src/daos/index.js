import messageFileDao from "./message/message-file.dao.js";
import messageMongoDao from "./message/message-mongo.dao.js";
import messageFirebaseDao from "./message/message-firebase.dao.js";
import messageSqliteDao from "./message/message-sqlite.dao.js";
import messageMysqlDao from "./message/message-mysql.dao.js";
import productSqliteDao from "./product/product-sqlite.dao.js";
import productMysqlDao from "./product/product-mysql.dao.js";

const getStorage = (storageType) => {
  switch (storageType) {
    case 'file':
      return {
        message: new messageFileDao()
      }
      break;    
    case 'mongo':
      return {
        message: new messageMongoDao()
      }
      break;
    case 'firebase':
      return {
        message: new messageFirebaseDao()
      }
      break;
    case 'mysql':
      return {
        product: new productMysqlDao(),
        message: new messageMysqlDao()
      }
      break;
    case 'sqlite':
      return {
        product: new productSqliteDao(),
        message: new messageSqliteDao()
      }
      break; 
    default:
      return {
        message: new messageMongoDao()
      }
      break;
  }
}

export { getStorage as Storage }