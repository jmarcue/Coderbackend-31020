import request from 'supertest';
import { expect } from 'chai';


const baseUrl = 'http://localhost:8080';
const url = '/api/productos';
const producId = '6372d9f84340cd75798976ef'; // id del producto
const productPrice = 10000;

describe("Test API REST", ()=>{
  describe('Test get producto', () => {
    it('obtiene productos', async()=> {
      let response = await request(baseUrl).get(url);
      expect(response.status).to.eql(200);
    });
  });
  describe('Test post producto', ()=> {
    it('Crea producto', async()=> {
      let postProduct = { 
        title: 'tongue', 
        price: 1200,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/face-grin-tongue-256.png'
      };      
      const response = await request(baseUrl).post(url).send(postProduct);
      expect(response.status).to.equal(200);
    });
  });
  describe('Test update producto', ()=>{
    it('Modificacion precio producto por id', async()=> {
      let response = await request(baseUrl).put(`${url}/${producId}`).send({price: productPrice});
      expect(response.status).to.eql(200);
    });
  });
  describe('Test delete producto', ()=>{
    it('Eliminacion  producto por id', async()=>{
      let response = await request(baseUrl).delete(`${url}/${producId}`).send();
      expect(response.status).to.eql(200);
    });
  });
});