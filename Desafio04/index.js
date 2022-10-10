// importaciones.
const Express = require('express');
const RouterProduct = require('./routes/route.Product.js');

const app = Express();

// puerto
const PORT = process.env.PORT || 8080;

// conexion.
const server = app.listen(PORT, () => {console.log(`The server listening on port ${server.address().port}`)});

// Manejo de errores de conexión
server.on("error", error => console.log(`Error on the server ${error}`));

//
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(__dirname + '/public'));
app.use('/api', RouterProduct);