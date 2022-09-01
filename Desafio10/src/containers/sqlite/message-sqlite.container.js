import knex from 'knex'

class messageSqliteContainer {
  constructor(config, tableName) {
    this.knex = knex(config);
    this.tableName = tableName;
  }

  async getAll() {
    try {
      return await this.knex.from(this.tableName).select('*');
    } 
    catch (err) {
      console.log(`Error Codigo: ${error.code} | Error inesperado al intentar obtener datos desde ${this.tableName}`);
      return [];      
    }
  }

  async save(obj) {
    try {
      await this.knex(this.tableName).insert(obj);
      return true;
    }       
    catch (err) {
      console.log(`Error Codigo: ${error.code} | Error inesperado al intentar guardar datos en ${this.tableName}`);
      return false;
    }  
  }

  async deleteAll() {
    try {
      await this.knex.from(this.tableName).del()
      return true;
    }       
    catch (err) {
      console.log(`Error Codigo: ${error.code} | Error inesperado al intentar borrar todos los datos desde ${this.tableName}`);
      return false;
    }     
  }

  async close() {
    await this.knex.destroy();
  }
}

export default messageSqliteContainer;