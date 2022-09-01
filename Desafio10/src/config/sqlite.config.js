import { __dirname } from "../utils/helper.util.js";

const sqliteConfig = {
  client: 'sqlite3',
  connection: {
      filename: __dirname + '../../database/coderbackend.sqlite'
  },
  useNullAsDefault: true
}

export { sqliteConfig };