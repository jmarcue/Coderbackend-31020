import { __dirname, __dirJoin } from "../utils/helper.util.js";

const sqliteConfig = {
  client: 'sqlite3',
  connection: {
      filename: __dirJoin(__dirname, '../database/coderbackend.sqlite')
  },
  useNullAsDefault: true
}

export { sqliteConfig };