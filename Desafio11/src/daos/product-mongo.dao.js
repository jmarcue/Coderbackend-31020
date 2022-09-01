import { mongoConfig } from "../config/mongo.config.js";
import { productModel } from "../models/product.model.js";
import productMongoContainer from "../containers/product-mongo.container.js";

class productMongoDao extends productMongoContainer {
  constructor() {
    super(mongoConfig, productModel);
  };
};

export default productMongoDao;