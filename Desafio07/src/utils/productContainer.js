import fs from "fs";
import productClass from "../classes/product.js";
import { returnMessage, verifyEmptyObject, getMaxId} from "./utils.js";

export default class productContainer {
  constructor(path) {
    this.path = path;
    this.readOrCreateFile();
  }

  async getAll() {
    try {
      const products = await this.getFileDataObject();
      return returnMessage(false, "products found", products);
    } 
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to get products`, null);
    }
  }

  async getById(idProduct) {
    try {
      const products = (await this.getAll()).payload;
      const product = products.find((product) => product.id === idProduct);

      if (product) {
        return returnMessage(false, "Product found", product);
      }
      else {
        return returnMessage(true, "Product not found", null);
      }
    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to get product id (${idProduct})`, null);
    }
  }
  
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "[]");

      return returnMessage(false, "Products deleted", null);
    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error to delete products`, null);
    }
  }

  async deleteById(idProduct) {
    try {
      const products = (await this.getAll()).payload;
      const findProduct = products.find((product) => product.id === idProduct);
      
      if (!findProduct) {      
        return returnMessage(true, "product not exists", null);
      } 
      const filterProducts = products.filter((product) => product.id !== idProduct);     
      await this.saveFileData(filterProducts);
      
      return returnMessage(false, "product deleted", findProduct);
    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to delete cart id (${idProduct})`, null);
    }
  }

  async updateById(idProduct, newProd) {
    try {
      const products = (await this.getAll()).payload;
      const indexProd = products.findIndex((product) => product.id === idProduct);
      
      if (indexProd === -1) {
        return returnMessage(true, "Product not found", null);
      }
      
      const updateProd = products[indexProd];

      if (newProd.title) {
        updateProd.title = newProd.title;
      }
      if (newProd.description) {
        updateProd.description = newProd.description;
      }
      if (newProd.code) {
        updateProd.code = newProd.code;
      }
      if (newProd.stock) {
        updateProd.stock = parseInt(newProd.stock);
      }
      if (newProd.price) {
        updateProd.price = parseFloat(newProd.price);
      }
      if (newProd.thumbnail) {
        updateProd.thumbnail = newProd.thumbnail;
      }

      products[indexProd] = updateProd;
      await this.saveFileData(products);

      return returnMessage(false, "product updated", updateProd);
    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to update product id (${idProduct})`, null);
    }
  }
  
  async save(product) {
    try {
      const products   = (await this.getAll()).payload;
      const idProducto = getMaxId(products) + 1;
      const newProduct = new productClass(
        idProducto,
        product.title,
        product.description,
        product.code,
        product.stock,
        product.price,
        product.thumbnail
      );

      products.push(newProduct);     
      await this.saveFileData(products);

      return returnMessage(false, "Product saved", newProduct);
    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to save product`, null);
    }
  }  
  
  async saveFileData(obj) {
    try {    
      await fs.promises.writeFile(this.path, JSON.stringify(obj, null, 2));
      return true;
    }
    catch {
        return false;
    }     
  }

  async getFileDataObject() {
    const obj = await this.getFileData();
    return (!verifyEmptyObject(obj)) ? JSON.parse(obj) : [];
  }  
  
  async getFileData() {
    return await fs.promises.readFile(this.path, "utf-8");
  }  

  async createEmptyFile() {
    fs.writeFile(this.path, "[]", (err) => {
      err ? console.log(err) : console.log(`${this.path} was created.`);
    });
  }

  async readOrCreateFile() {
    try {
      await this.getFileData();
    }
    catch (err) {
      err.code === "ENOENT" ? this.createEmptyFile() : console.log(`Error Code: ${err.code} | Unexpected error when trying to read ${this.path}`);
    }
  }   
}