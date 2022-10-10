// clase producto.
class Product {
    constructor(title, price, thumbnail) {
        this.title     = title;
        this.price     = price;
        this.thumbnail = thumbnail;
    }
    // Método estático de clase, soporte devpersistencia en memoria.
    static products = [];
}

module.exports = Product;