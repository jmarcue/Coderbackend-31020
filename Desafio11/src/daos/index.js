import productMongoDao from './product-mongo.dao.js';
import productMysqlDao from './product-mysql.dao.js';
import messageMongoDao from './message-mongo.dao.js';
import messageMysqlDao from './message-mysql.dao.js';

const getStorage = (storageType) => {
  switch (storageType) {
    case 'mongo':
      return {
        product: new productMongoDao(),
        message: new messageMongoDao()
      }
      break;
    case 'mysql':
      return {
        product: new productMysqlDao(),
        message: new messageMysqlDao()
      }
      break;
    default:
      return {
        product: new productMongoDao(),
        message: new messageMongoDao()
      }
      break;
  }
}

export { getStorage as Storage }