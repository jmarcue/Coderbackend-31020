const socket = io();

const hbsAuth = (name) => {
  return fetch('hbs/auth.hbs')
    .then(res => res.text())
    .then(auth => {
      const hbs = Handlebars.compile(auth);
      const html = hbs({name});
      return html;
    });
};

socket.on('auth', name => {
  hbsAuth(name)
    .then(html => { 
      document.querySelector('#auth').innerHTML = html;
    });
});

const hbsForm = () => {
  return fetch('hbs/productForm.hbs')
    .then(res => res.text())
    .then(form => {
      const hbs = Handlebars.compile(form);
      const html = hbs();
      return html;
    });
};

socket.on('productForm', () => {
  hbsForm()
    .then(html => {
      document.querySelector('#productForm').innerHTML = html;
      const addProduct = document.querySelector('#productForm').querySelector('#addProductForm');
      addProduct.addEventListener('submit', e => {
        e.preventDefault();
        const product = {
          title: addProduct[0].value,
          price: addProduct[1].value,
          thumbnail: addProduct[2].value
        };
            
        socket.emit('addProduct', product);
        addProduct.reset();
      });
    });
});

const hbsTable = (products) => {
  return fetch('hbs/productTable.hbs')
    .then(res => res.text())
    .then(table => {
      let exists = true;
      const hbs = Handlebars.compile(table);
      if (products === null) {
        exists = false;
      };
      const html = hbs({products, exists});
      return html;
    });
};

socket.on('productTable', products => {
  hbsTable(products)
    .then(html => {
      document.querySelector('#productTable').innerHTML = html;
    });
});

const hbsMensaje = () => {
  return fetch('hbs/messages.hbs')
    .then(res => res.text())
    .then(messages => {
      const hbs = Handlebars.compile(messages);
      const html = hbs();
      return html;
    });
};

socket.on('messages', () => {
  hbsMensaje()
    .then(html => {
      document.querySelector('#messages').innerHTML = html;
      const newMessage = document.querySelector('#messages').querySelector('#newMessageForm');

      newMessage.addEventListener('submit', e => {
        e.preventDefault();        
        if (((!newMessage[0].value) && (!newMessage[1].value)) || ((!newMessage[0].value) || (!newMessage[1].value))) {
          alert("Completar los campos obligatorios");
        }
        else {
          const message = {
              mail: newMessage[0].value,
              date: new Date().toLocaleString('es-CL'),
              message: newMessage[1].value,
          };
          socket.emit('addMessage', message);
          newMessage.reset();
        };
      });
    });
});

const hbsChat = (message) => {
  return fetch('hbs/chat.hbs')
    .then(res => res.text())
    .then(chat => {
      const hbs = Handlebars.compile(chat);
      const html = hbs({message});
      return html;
    });
};

socket.on('chat', message => {
  console.log("chat");
  hbsChat(message)
    .then(html => {
      const messages = document.querySelector("#messages");
      messages.querySelector('#chat').innerHTML = html;
    });
});