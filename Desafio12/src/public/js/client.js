const socket = io.connect();

let pantalla = document.getElementById('pantalla');
let botonChat = document.getElementById('btnChat');
botonChat.addEventListener('click', () => { inputValidate() });

function inputValidate() {
  let user = document.getElementById('userChat').value;
  let mensaje = document.getElementById('messageChat').value;
  if (mensaje === "" || user === "") {
      alert(`CAMPOS REQUERIDOS`);
  }
  else {
      let nuevoMensaje = {
          user: document.getElementById('userChat').value,
          mensaje: document.getElementById('messageChat').value
      };
      socket.emit('new-message', nuevoMensaje);
      document.getElementById('messageChat').value = "";
  };
};

// Generar la fecha
let date = new Date();
newDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

function renderMessage(data) {
  let html = data.map((elem, i) => {
      return (`
      <div>
      Usuario: <strong style="color:blue">${elem.user}</strong></span>
      (a las <span>${newDate.toString()}</span>)
      dijo: <i style="color:green">${elem.mensaje}</i></div>`);
  }).join(' ');
  document.getElementById('messageNew').innerHTML = html;
};

socket.on('new-message-server', (data) => {
    renderMessage(data);
});

function oldMsg(data) {
    let html2 = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.message.user}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.message.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('messageOld').innerHTML = html2;
};

document.getElementById("btnOldMsg").addEventListener("click", function () {
    fetch('http://localhost:8080/messages')
        .then(res => res.json())
        .then(data => oldMsg(data))
        .catch(err => console.log(err))
});


document.getElementById('btnProductForm').addEventListener('click', () => { validateProductForm() });

function validateProductForm() {
  let title = document.getElementById('title').value;
  let price = document.getElementById('price').value;
  let thumbnail = document.getElementById('thumbnail').value;
  
  if (title === "" || price === "" || thumbnail === "") {
      alert('Ingrese los campos requeridos');
  }
  else {
    let newProd = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', newProd);
    
    document.getElementById('title').value = "";
    document.getElementById('price').value = "";
    document.getElementById('thumbnail').value = "";
  };
};

const fragment = document.createDocumentFragment();
const tabla = document.getElementById('tableProd');
const template = document.getElementById('templateList').content;

document.addEventListener('DOMContentLoaded', e => { fetchData() });

const fetchData = async () => {
  const res = await fetch('http://localhost:8080/api/products');
  const data = await res.json();
  viewProductContent(data);
};

const viewProductContent = data => {
    data.forEach(producto => {
      template.getElementById('prodTitle').textContent = producto.title;
      template.getElementById('prodPrice').textContent = producto.price;
      template.getElementById('prodImg').setAttribute("src", producto.thumbnail);

      const clone = template.cloneNode(true);
      fragment.appendChild(clone);
    });
    tabla.appendChild(fragment);
};

socket.on('new-prod-server', async data => {
  let array = []; 
  array.push(await data);
  viewProductContent(array);  
});