// Modulo File System
const fs = require('fs');

// clase container
class Container {
    // constructor de la clase
    constructor(fileName) {
      this.fileName = fileName;
    }
   
    // determina si el objeto es vacio
    isEmptyObject(obj) {        
        return (obj == null) ? true : Object.entries(obj).length === 0;
    } 

    // Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            let obj = [];
            let data = await fs.promises.readFile(this.fileName, 'utf8');
            if (!this.isEmptyObject(data)) {
                obj = JSON.parse(data);
            }                
            return obj;   
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    } 

    async save(object) {
        try {
            let content = await this.getAll();
            let maxId = content.reduce((prev, curr) => {return (prev = prev > curr.id ? prev : curr.id); }, 0);
            maxId++;
            object.id = maxId;
            content.push(object);
            await fs.promises.writeFile(this.fileName, JSON.stringify(content, null, 2));
            return maxId;
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    // Recibe un id y devuelve el procucto con ese id, o null si no está.
    async getById(number) {
        try {
            let content = await this.getAll();
            const filter = content.find(item => item.id === number);
            return this.isEmptyObject(filter) ? null : filter;
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    // Elimina del archivo el producto con el id buscado.
    async deleteById(id) {
        try {
            if (await this.getById(id) == null) {
                return false;
            }    
            else {
                let content = await this.getAll();
                const filter = content.filter(elm => elm.id !== id);
                await fs.promises.writeFile(this.fileName, JSON.stringify(filter, null, 2));
                return true;    
            }
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }   

    // Elimina todos los productos presentes en el archivo.
    async deleteAll() {
        try {
            let content = [];
            await fs.promises.writeFile(this.fileName, JSON.stringify(content));
        } catch(err) {
            console.log(`Error: ${err}`);
        }        
    }  
}

module.exports = Container;