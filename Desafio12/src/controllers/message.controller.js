import messageDao from '../daos/message.dao.js';

export default class messageController {
  constructor() { 
    this.message = new messageDao();
  }

  async messageSave(req, res) {
    try {
      if (!req) {
        return res.status(404).json({ text: 'Error al agregar mensaje' });
      }
      const newMessage = await { ...req };
      await this.message.save(newMessage);
    }
    catch (error) {
      return res.status(400).json({ text: 'Ocurrió un error', error });
    }
  }

  async messageGetAll(req, res) {
    try {
      let messages = await this.message.getAll();
      return res.status(200).json(messages);
    }
    catch (error) {
      return res.status(400).json({ text: 'Ocurrió un error', error });
    }
  }
}