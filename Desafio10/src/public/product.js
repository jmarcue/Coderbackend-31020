const socket = io();

const tbodyProducts = document.getElementById('tbodyProducts');
const nameForm      = document.getElementById('nameForm');
const priceForm     = document.getElementById('priceForm');
const thumbnailForm = document.getElementById('thumbnailForm');
const addProduct    = document.getElementById('saveProduct');

socket.emit('sendProduct');

socket.on('allProducts', data => {
  data.forEach(product => {
    product = `
      <tr>
        <th scope="row">${product.id}</th>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><img src="${product.thumbnail}" width="50" height="50"></td>
      </tr>`;

    tbodyProducts.innerHTML += product;
  });
});

socket.on('refreshTable', data => {
  product = `
    <tr>
      <th scope="row">${data[0].id}</th>
      <td>${data[0].name}</td>
      <td>${data[0].price}</td>
      <td><img src="${data[0].thumbnail}" width="50" height="50"></td>
    </tr>`;
    
  tbodyProducts.innerHTML += product;
});

addProduct.addEventListener('click', () => {
  const product = {
    name: nameForm.value,
    price: priceForm.value,
    thumbnail: thumbnailForm.value
  }

  nameForm.value = "";
  priceForm.value = "";
  thumbnailForm.value = "";

  socket.emit('saveProduct', product);
});