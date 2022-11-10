import mongoConnect from "../configs/mongo.config.js";
import productDao from "../dao/product.dao.js";
import { productDto } from "../dto/product.dto.js";
import { productModel } from "../models/product.model.js";
import { logger } from '../utils/winston.util.js';

class productPersistence extends productDao {
  constructor () {
    super()
    this.cxn = new mongoConnect();
    this.msg = console.log('*** Base de Datos Mongo');
  }

  async addPersistenceProducto(dataToDb) {
    try {
      await productModel.create(dataToDb);
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAllPersistenceProducto() {
    try {
      const prodInDb = await productModel.find({});
      return prodInDb;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByIDPersistenceProducto(_id) {
    try {
      const prodById = await productModel.findOne({ _id });
      const myDto = productDto(await prodById);
      console.log('DTO',myDto);
      return myDto;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deletePersistenceProducto(_id) {
    try {
      const prodToDel = await productModel.deleteOne({ _id });
      return prodToDel;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async updatePersistenceProducto(_id, data) {
    try {
      const prodUpdated = await productModel.updateOne({ _id }, data, {
        new: true,
      });
      return prodUpdated;
    } catch (error) {
      logger.error.error(error);
    }
  }
}

export default productPersistence;