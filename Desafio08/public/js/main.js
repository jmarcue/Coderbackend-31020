let socket = io.connect();

const btnMessage = document.getElementById('btn-submit-message');

btnMessage.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('input-email').value;
  const message = document.getElementById('input-message').value;
  
  if (email !== '' && message !== '') {
    socket.emit('messageAdd', {
      "email" : email,
      "message" : message,
      "date" : new Date()
    });
  }; 
});

// message socket
socket.on('messageList', (data) => {
  //console.log(data);
  $('#history-messages').empty();
  data.forEach((message) => {
    $('#history-messages').append(`
    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
      <span class="text-secondary">
        <small style="display:block">
          <em style="color:#804000">[${formatDate(new Date(message.date))}]</em> 
          <strong style="color:#0000FF">${message.email}</strong>: 
          <em style="color:#008f39">${message.message}</em>
        </small>
      </span>
    </li>`);
  });
});

const btnProduct = document.getElementById('btn-submit-product');

btnProduct.addEventListener('click', (event) => {
  event.preventDefault();
  const name = document.getElementById('input-name').value;
  const price = document.getElementById('input-price').value;
  const url = document.getElementById('input-url').value;

  if (name !== '' && price !== '' && url !== '') {
    socket.emit('productAdd', {
      "name" : name,
      "price" : price,
      "url" : url
    });
  }; 
});

// product socket
socket.on('productList', (data) => {
  $('#product-table-body').empty();
  data.forEach((product) => {
    $('#product-table-body').append(`
    <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
        <img src="${product.url}" alt="${product.name}" style="width: 45px; height: 45px" class="rounded-circle" />
      </td>
    </tr>`);
  });
});

// function for date format.
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());
  const year = date.getFullYear();
  const hour = padTo2Digits(date.getHours());
  const min = padTo2Digits(date.getMinutes());
  const seg = padTo2Digits(date.getSeconds());

  return ([day, month, year].join('/') + ' ' + [hour, min, seg].join(':'));
}