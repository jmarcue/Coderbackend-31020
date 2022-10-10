import knexLib from 'knex'
import { sqlite } from '../options/config.js';

async function sqliteScript() {
  try {
    const knex = new knexLib(sqlite);

    await knex.schema.dropTableIfExists('messages');
    console.log('messages table deleted');

    await knex.schema.createTable('messages', (table) => {
      table.increments('id').primary()
      table.string('email', 100).notNullable()
      table.timestamp('date').defaultTo(knex.fn.now())
      table.string('message', 100).notNullable()
    });

    console.log('messages table created');

    await knex.destroy();
  }
  catch (error) {
    console.error(error);
  }
}

export default sqliteScript;
