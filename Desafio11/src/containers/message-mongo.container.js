export default class messageMongoContainer {
  constructor(mongo, messageModel) {
    this.mongo = mongo;
    this.messageModel = messageModel;
  }

  async getAll() {
    try {
      let messages = await this.messageModel.find();
      if (messages.length != 0) {
        return messages;
      }
      else {
        return messages = [];
      }
    } 
    catch (error) {
      throw Error('Error al obtener los mensajes');
    }
  }  

  async save(message) {
    try {
      const newMessage = new this.messageModel(message);
      this.mongo
        .then(_ => newMessage.save())
        .catch(err => console.log(`Error: ${err.message}`));
    }
    catch (error) {
      throw Error('Error al guardar el mensaje');
    }
  }
}