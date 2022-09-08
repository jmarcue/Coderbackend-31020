import mongoose from 'mongoose';

export default class mongoConnect {
  constructor() {
      this.connection = this.createConnection();
  }

  createConnection() {
    const uri = 'mongodb://localhost:27017/coder';
    const options = { useNewUrlParser: true, useUnifiedTopology: true }
    
    mongoose.connect(uri, options).then(err => { err });
  }
}