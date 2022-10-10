import knexLib from 'knex'
import { mysql } from '../options/config.js';

const productsList = [
  {
    name: "Business",
    price: 100,
    url: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-128.png",
  },
  {
    name: "Prohibition",
    price: 200,
    url: "https://cdn1.iconfinder.com/data/icons/prohibition-1/512/3_Forbidden-128.png",
  },
  {
    name: "Social",
    price: 500,
    url: "https://cdn4.iconfinder.com/data/icons/social-media-2146/512/8_social-128.png",
  },
];

async function mysqlScript() {
  try {
    const knex = new knexLib(mysql);

    await knex.schema.dropTableIfExists('products');    
    console.log('products table deleted');

    await knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.decimal('price').notNullable();
      table.string('url', 200).notNullable();
      table.timestamps(true, true);
    });
 
    console.log("Products table created");

    for (const product of productsList) {
      const contents = await knex('products').insert(product);
      console.log("Product Id: " + contents + " inserted");
    }
    
    await knex.destroy();
  }
  catch (error) {
    console.error(error);
  } 
}

export default mysqlScript;