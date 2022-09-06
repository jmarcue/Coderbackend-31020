export default class productMongoContainer {
  constructor(connect, model) {
    this.connect = connect;
    this.model = model;
  }

  async getAll() {
    try {
      let products = await this.model.find();
      if (products.length != 0) {
        return products;
      }
      else {
        return products = [];
      }
    }
    catch (error) {
      throw Error('Error al obtener los productos');
    }
  }

  async save(product) {
    try {
      const newProduct = new this.model(product);
      this.connect
        .then(_ => newProduct.save())
        .catch(err => console.log(`Error: ${err.message}`));
    }
    catch (error) {
      throw Error('Error al guardar el producto');
    } 
  }     
} 