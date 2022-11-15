import axios from 'axios';

const baseUrl = 'http://localhost:8080';
const url = '/api/productos';
const productId = '636f24a40d9e5e95da20feac';

const axiosGet = async () => {
  try {
    const resp = await axios.get(`${baseUrl}/api/productos`);
    console.log("::: Test get producto :::");
    console.log(resp.data);
  }
  catch (err) {
    console.log(err);
  }
};
axiosGet();

const axiosPost = async () => {
  let postProduct = { 
    title: 'tongue', 
    price: 1200,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/face-grin-tongue-256.png'
  };

  let res = await axios.post(`${baseUrl}${url}`, postProduct);
  let data = res.data;
  console.log("::: Test post producto :::");  
  console.log(data);
}
axiosPost();

const axiosPut = async () => {
  try {
    let putProduct = { 
      title: 'Smile', 
      price: 1260,
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/face-laugh-wink-512.png'
    };
  
    const resp = await axios.put(`${baseUrl}${url}/${productId}`, putProduct);
    console.log("::: Test update producto :::"); 
    console.log('PUT', resp);
  } 
  catch (err) {
    console.log(err);
  }
};
axiosPut();

const axiosDelete = async () => {
  try {      
    const resp = await axios.delete(`${baseUrl}${url}/${productId}`);
    console.log("::: Test delete producto :::"); 
    console.log('DELETE', resp);
  }
  catch (err) {
    console.log(err);
  }
};
axiosDelete();