import request from 'supertest';
import { expect } from 'chai';


const baseUrl = 'http://localhost:8080';
const url = '/api/productos';
const producId = '6372dac907291eafe15d05ea'; // id del producto
const urlModify = `/api/productos/${producId}`; 
const price = 10000;
const product = {
  "title": 'superTest', 
  "price": 21100,
  "thumbnail": 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/circle-check-512.png'
};

describe("Test API REST", ()=>{
  describe('Test get producto', () => {
    it('exitos retorna status 200', async()=> {
      let response = await request(baseUrl).get(url);
      expect(response.status).to.eql(200);
    });
  });
  describe('test post producto', ()=> {
    it('Crea producto', async()=> {
      const response = await request(baseUrl).post(url).send(product);
      expect(response.status).to.equal(200);
    });
  });
  describe('test update producto', ()=>{
    it('Modificacion precio producto por id', async()=> {
      let response = await request(baseUrl).put(urlModify).send({price: price});
      expect(response.status).to.eql(200);
    });
  });
  describe('test delete producto', ()=>{
    it('Eliminacion  producto por id', async()=>{
      let response = await request(baseUrl).delete(urlModify).send();
      expect(response.status).to.eql(200);
    });
  });
});