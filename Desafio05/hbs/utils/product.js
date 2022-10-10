// clase producto.
class Product {
  constructor(name, price, url) {
      this.name     = name;
      this.price    = price;
      this.url      = url;
  }
  // Método estático de clase, soporte de persistencia en memoria.
  static products = [];
}

export default Product;