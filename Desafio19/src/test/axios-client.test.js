import axios from 'axios';

const product = {
  title: 'rice', 
  price: 200,
  thumbnail: 'https://cdn2.iconfinder.com/data/icons/international-food/64/fried_rice-128.png'
}

const axiosGet = async () => {
  try {
    const resp = await axios.get('http://localhost:8080/api/productos');
    console.log(resp.data)
  }
  catch (err) {
    console.log(err);
  }
};
axiosGet();

const axiosPost = async () => {
  let postProduct = { 
    title: 'Arroz Blanco', 
    price: 1200,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/international-food/64/fried_rice-128.png'
  };

  let res = await axios.post('http://localhost:8080/api/productos', postProduct);
  let data = res.data;
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
  
    const resp = await axios.put('http://localhost:8080/api/productos/636f1f67a8981552bb9e7d79', putProduct);
    console.log('PUT', resp);
  } 
  catch (err) {
    console.log(err);
  }
};

axiosPut();

const axiosDelete = async () => {
  try {      
    const resp = await axios.delete('http://localhost:8080/api/productos/636f1f67a8981552bb9e7d79');
    console.log('DELETE', resp);
  }
  catch (err) {
    console.log(err);
  }
};
axiosDelete();