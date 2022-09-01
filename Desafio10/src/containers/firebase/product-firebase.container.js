export default class productFirebaseContainer {
  constructor(queryProduct) {
    this.queryProduct = queryProduct;  
  }

  async getAll() {
    const docsProducts = await this.queryProduct.get();
    const allProducts = docsProducts.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    return allProducts;
  }

  async getById(id) {
    const docsProducts = this.queryProduct.doc(id);
    const response = await docsProducts.get();
    
    return (response.data() == null) 
      ? null
      : { id: response.id, ...response.data() };
  }

  async save(product) {
    await this.queryProduct.add(product);
  }

  async updateById(idProduct, name, price, thumbnail) {
    const docsProducts = this.queryProduct.doc(idProduct);
    await docsProducts.update({
      name: name,
      price: price,
      thumbnail: thumbnail
    });
  }  
}