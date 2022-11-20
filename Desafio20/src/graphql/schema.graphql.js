import { buildSchema } from 'graphql';
import productModel from '../models/product.model.js';
import { logger } from '../utils/winston.util.js';


const schema = buildSchema(`
  input ProductInput {
    title: String,
    price: Int,
    thumbnail: String
  },
  type Product {
    _id: ID,
    title: String,
    price: Int,
    thumbnail: String
  },
  type Query {
    getProducts: [Product]
  },
  type Mutation {
    createProduct(input: ProductInput): Product
  }
`);

const root = {
  getProducts: getProducts,
  createProduct: createProduct
};

async function getProducts() {
  try {
    const prodInDb = await productModel.find({});
    return prodInDb;
  }
  catch (error) {
    logger.error.error(error);
  }
}

async function createProduct({input}) {
  try {
    const newProd = await productModel.create(input);
    return newProd;
  }
  catch (error) {
    logger.error.error(error);
  }
}

export { schema, root  }