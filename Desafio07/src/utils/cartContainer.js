import fs from "fs";
import cartClass from "../classes/cart.js";
import { returnMessage, verifyEmptyObject, getMaxId} from "./utils.js";


export default class cartContainer {
  constructor(path) {
    this.path = path;
    this.readOrCreateFile(); 
  }

  async getAll() {
    try {
      const carts = await this.getFileDataObject();
      
      return returnMessage(false, "carts found", carts);
    } 
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to get cart`, null);
    }
  }

  async getById(idCart) {
    try {
      const carts = (await this.getAll()).payload;
      const cart = carts.find((cart) => cart.id === idCart);

      if (cart) {
        return returnMessage(false, "Cart found", cart);
      }
      else {
        return returnMessage(true, "Cart not found", null);
      }
    } catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to get cart id (${idCart})`, null);
    }
  }

  async save(cart) {
    try {
      const carts = (await this.getAll()).payload;      
      const id = getMaxId(carts) + 1;
      const newCart = new cartClass(id, cart.products);
      carts.push(newCart);
      await this.saveFileData(carts);

      return returnMessage(false, "Cart saved", newCart);
    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to save cart`, null);
    }
  }  
  
  async deleteById(idCart) {
    try {
      const carts = (await this.getAll()).payload;
      const findCart = carts.find((cart) => cart.id === idCart);
      
      if (!findCart) {      
        return returnMessage(true, "cart not exists", null);
      } 
      const filterCarts = carts.filter((cart) => cart.id !== idCart);     
      await this.saveFileData(filterCarts);
      
      return returnMessage(false, "cart deleted", findCart);
    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to delete cart id (${idCart})`, null);
    }
  }

  async deleteProductFromCartById(idCart, idProduct) {
    try {
      const carts = (await this.getAll()).payload;
      const findCart = carts.findIndex((cart) => cart.id === idCart);
      
      if (findCart === -1) {
        return returnMessage(true, "Cart not exists", null);  
      }
      const cart = carts[findCart];
      if (!cart.products.find((product) => product.id === idProduct)) {
        return util.returnMessage(true, "Product not exists", null);
      }
      cart.products = cart.products.filter((product) => product.id !== idProduct);
      carts[findCart] = cart;
      await this.saveFileData(carts);

      return returnMessage(false, "Product deleted from cart", cart);

    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to delete product from cart id (${idCart})`, null);
    }
  }  

  async addProductToCartById(idCart, product) {
    try {
      const carts = (await this.getAll()).payload;
      const findCart = carts.findIndex((cart) => cart.id === idCart);      
      if (findCart === -1) {      
        return returnMessage(true, "cart not exists", null);
      }      
      const cart = carts[findCart];
      cart.products = [...cart.products, ...product];      
      carts[findCart] = cart;      
      await this.saveFileData(carts);
      
      return returnMessage(false, "Product added to cart", cart);
    }
    catch (err) {
      return returnMessage(true, `Error code: ${err.code} | Error trying to add the product from cart id (${idCart})`, null);
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
  
  async getFileData() {
    return await fs.promises.readFile(this.path, "utf-8");
  } 
  
  async getFileDataObject() {
    const obj = await this.getFileData();
    return (!verifyEmptyObject(obj)) ? JSON.parse(obj) : [];
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