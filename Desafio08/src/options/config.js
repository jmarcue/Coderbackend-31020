import { __dirname } from "../utils/util.js";

const mysql = {
  client: 'mysql',
  connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'ecommerce'
  }
}

const sqlite = {
  client: 'sqlite3',
  connection: {
      filename: __dirname + '../../db/ecommerce.sqlite'
  },
  useNullAsDefault: true
}

export { mysql, sqlite };