export default class messageFirebaseContainer {
  constructor(queryMessage) {
    this.queryMessage = queryMessage;
  }

  async getAll() {
    const docsMessages = await this.queryMessage.get();
    const allMessages  = docsMessages.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    return allMessages;
  }

  async save(message) {
    await this.queryMessage.add(message);
  }
}