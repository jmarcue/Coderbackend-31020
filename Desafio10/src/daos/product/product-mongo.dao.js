import { connection } from "../../config/mongo.config.js";
import { productModel } from "../../models/product.model.js";
import productMongoContainer from "../../containers/mongo/product-mongo.container.js";

class productMongoDao extends productMongoContainer {
  constructor() {
    super(connection, productModel);
  };
};

export default productMongoDao;