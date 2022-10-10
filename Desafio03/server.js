// requeridos.
const Container = require('./container.js');
const express = require('express');

const app = express();
// lo que sea que esté en la variable de entorno PORT, o 8080 si no hay nada allí.
const PORT = process.env.PORT || 8080;

// conexion.
const server = app.listen(PORT, () => {console.log(`The server listening on port ${server.address().port}`) }); 

// Manejo de errores de conexión
server.on("error", error => console.log(`Error on the server ${error}`));

// Crea instancia del contenedor
const product = new Container('products.txt');

app.get('/', (req, res) => {
    res.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
});

// endpoints productos
app.get('/productos', async (req, res) => {
    const products = await product.getAll();
    res.send(products);
});
 
// endpoints producto random
app.get('/productoRandom', async (req, res) => {
    const products = await product.getAll();
    const randonNumber = Math.floor(Math.random() * products.length);
    res.send(products[randonNumber]);
})
    
