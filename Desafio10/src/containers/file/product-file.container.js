import { isEmptyObject, getMaxId } from "../../utils/helper.util.js";

export default class productFileContainer {
  constructor(path, fs) {
    this.path = path;
    this.fs = fs;
  }

  async setData(data) {
    return await this.fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  } 

  async getData() {
    return await this.fs.promises.readFile(this.path, "utf-8");
  } 

  async getParseData() {
    const obj = await this.getData();
    return (!isEmptyObject(obj)) ? JSON.parse(obj) : [];
  }   
  
  async readOrCreateFile() {
    try {
      await this.getData();
    }
    catch (err) {      
      err.code === "ENOENT"
        ? this.setData([])
        : console.log(`Codigo error: ${err.code} | Error al intentar crear archivo: ${this.path}`);                      
    }
  }

  async read() {
    try {
      await this.readOrCreateFile();
      return await this.getParseData();
    }
    catch(err) {
      throw Error(`Error al leer el archivo ${err}`);
    }
  }

  async write(data, msg) {
    try {
      await this.setData(data);
      console.log(msg);
    }
    catch (err) {
      throw Error(`Error al escribir en el archivo ${err}`);
    }
  }

  async getAll() {
    return await this.read();
  }

  async getById(id) {
    let fileData = await this.read();
    return fileData.filter(product => product.id == id);
  }

  async save(product) {
    let newProduct = {};
    let fileData = await this.read();

    if (isEmptyObject(fileData)) {
      product.id = 1;
      newProduct = product;
    }
    else {
      product.id = getMaxId(fileData) + 1;
      newProduct = product;
    }

    fileData.push(newProduct);
    await this.write(fileData, 'producto Agregado');

    return product.id;
  }

  async deleteAll() {
    await this.write([], 'Se eliminaron todos los productos');
  }

  async deleteById(idProduct) {
    let fileData = await this.read();
    let product = fileData.find(product => product.id == idProduct);

    if (!product) {
      let index = fileData.indexOf(product);
      // console.log(index);
      fileData.splice(index, 1);
      await this.write(fileData, `Producto Id: ${idProduct} eliminado`);
    }
    else {
      throw Error(`Producto con Id: ${idProduct} no existe`);
    }
  }
}