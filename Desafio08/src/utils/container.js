import fs from 'fs';

class Container {
  constructor(name) {
    this.filename = name;
    this.readFileOrCreate();
  }

  async createEmptyFile() {
    fs.writeFile(this.filename, "[]", (error) => {
      error ? console.log(error) : console.log(`${this.filename} was created.`);
    });
  };

  async readFileOrCreate() {
    try {
      await fs.promises.readFile(this.filename, "utf-8");
    }
    catch (error) {
      error.code === "ENOENT" ? this.createEmptyFile() : console.log(`Error Code: ${error.code} | Unexpected error when trying to read ${this.filename}`);
    }
  }

  async getData() {
    const data = await fs.promises.readFile(this.filename, "utf-8");
    return data;
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }

  async deleteAll() {
    try {
      await this.createEmptyFile();
    }
    catch (error) {
      console.log(`Error (${error.code}) when trying to delete all`);
    }
  }

  async save(object) {
    try {
      const data = await this.getData();
      const parseData = JSON.parse(data);

      object.id = parseData.length + 1;
      parseData.push(object);

      await fs.promises.writeFile(this.filename, JSON.stringify(parseData));
      return object.id;
    } 
    catch (error) {
      console.log(`Error Code: ${error.code} | There was an error when trying to save.`);
    }
  }
}

export default Container;