const socket = io();

const hbsLog = (name) => {
  return fetch('hbs/auth.hbs')
    .then(res => res.text())
    .then(log => {
      const hbs = Handlebars.compile(log);
      const html = hbs({name});
      return html;
    });
};

socket.on('auth', name => {
  hbsLog(name)
    .then(html => { document.querySelector('#log').innerHTML = html; });
});

const hbsForm = () => {
    return fetch('hbs/formProductos.hbs')
        .then(res => res.text())
        .then(form => {
            const hbs = Handlebars.compile(form);
            const html = hbs();
            return html;
        });
};

socket.on('formProductos', () => {
    hbsForm()
        .then(html => {
            document.querySelector('#formProductos').innerHTML = html;
            const addProduct = document.querySelector('#formProductos').querySelector('#addProductForm');
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
    return fetch('hbs/table.hbs')
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

socket.on('tablaProductos', products => {
    hbsTable(products)
        .then(html => {
            document.querySelector('#tabla').innerHTML = html;
        });
});

const hbsMensaje = () => {
    return fetch('hbs/mensajes.hbs')
        .then(res => res.text())
        .then(messages => {
            const hbs = Handlebars.compile(messages);
            const html = hbs();
            return html;
        });
};

socket.on('mensajes', () => {
    hbsMensaje()
        .then(html => {
            document.querySelector('#mensajes').innerHTML = html;
            const newMessage = document.querySelector('#mensajes').querySelector('#newMessageForm');

            newMessage.addEventListener('submit', e => {
                e.preventDefault();
            
                if (((!newMessage[0].value) && (!newMessage[1].value)) || ((!newMessage[0].value) || (!newMessage[1].value))) {
                    alert("Completar los campos obligatorios");
                } else {
                    const msj = {
                        mail: newMessage[0].value,
                        date: new Date().toLocaleString('es-CL'),
                        message: newMessage[1].value,
                    };
                    socket.emit('addMessage', msj);
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
    console.log(message);
    hbsChat(message)
        .then(html => {
            const messages = document.querySelector("#mensajes");
            messages.querySelector('#chat').innerHTML = html;
        });
});