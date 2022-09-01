export default class messageMongoContainer {
  constructor(mongo, messsageModel) {
    this.mongo = mongo;
    this.messsageModel = messsageModel;
  }

  async getAll() {
    try {
      let docs = false;
      docs = await this.messageModel.find();
      if (docs) {
        return docs;
      }
      else {
        return false;
      }
    } 
    catch (error) {
      throw Error('Error al obtener los mensajes');
    }
  }  

  async save(message) {
    try {
      const newMessage = new this.messageModel(message);
      this.mongoDB
        .then(_ => newMessage.save())
        .catch(err => console.log(`Error: ${err.message}`));

    }
    catch (error) {
      throw Error('Error al guardar el mensaje');
    }
  }
}