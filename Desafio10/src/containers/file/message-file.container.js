import { isEmptyObject, getMaxId } from "../../utils/helper.util.js";

export default class messageFileContainer {
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
    }
    catch (err) {
      throw Error(`Error al escribir en el archivo ${err}`);
    }
  }

  async getAll() {
    return await this.read();
  }
  
  async save(message) {
    let newMessage = {};
    let fileData = await this.read();

    if (isEmptyObject(fileData)) {
      message.id = 1;
      newMessage = message;
    }
    else {
      message.id = getMaxId(fileData) + 1;
      newMessage = message;
    }

    fileData.push(newMessage);
    await this.write(fileData, 'mensaje Agregado');

    return message.id;
  }
}