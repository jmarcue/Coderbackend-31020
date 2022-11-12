import productPersistence from '../persistences/product.persistence.js';
import { logger } from '../utils/winston.util.js';

class productFactory {
  constructor() {
    this.database = new productPersistence();
  }

  async addServiceProducto(data) {
    try {
      const dataToDb = {
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
      };
      return await this.database.addPersistenceProducto(dataToDb);
    }
    catch (error) {
      logger.error.error(error);
    }
  }

  async findAllServiceProducto() {
    try {
      const prodInDb = await this.database.findAllPersistenceProducto();
      return prodInDb;
    }
    catch (error) {
      logger.error.error(error);
    }
  }

  async findByIDServiceProducto(_id) {
    try {
      const prodById = await this.database.findByIDPersistenceProducto(_id);
      return prodById;
    }
    catch (error) {
      logger.error.error(error);
    }
  }

  async deleteServiceProducto(_id) {
    try {
      const prodToDel = await this.database.deletePersistenceProducto(_id);
      return prodToDel;
    }
    catch (error) {
      logger.error.error(error);
    }
  }

  async updateServiceProducto(_id, data) {
    try {
      const prodUpdated = await this.database.updatePersistenceProducto(_id, data);
      return prodUpdated;
    }
    catch (error) {
      logger.error.error(error);
    }
  }
}

export default productFactory;