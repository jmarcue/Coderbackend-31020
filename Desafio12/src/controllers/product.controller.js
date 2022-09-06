import productMongoDao from '../daos/product-mongo.dao.js';

export default class productController {
  constructor() { 
    this.product = new productMongoDao();
  }

  async save(req, res) {
    try {
      if (!req) {
        return res.status(404).json({ text: 'Error al agregar el producto' });
      }
      const newProduct = await { ...req };
      await this.product.save(newProduct);
    }
    catch (error) {
      return res.status(400).json({ text: 'Ocurrió un error', error });
    }
  }

  async getAll(req, res) {
    try {
      let products = await this.product.getAll();
      return res.status(200).json(products);
    }
    catch (error) {
      return res.status(400).json({ text: 'Ocurrió un error', error });
    }
  }
}