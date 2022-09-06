import { mongoConnect } from "../config/mongo.config.js";
import { productModel } from "../models/product.model.js";
import productContainer from "../containers/product-mongo.container.js";

export default class productDao extends productContainer {
  constructor() {
    super(mongoConnect, productModel);
  };
}




