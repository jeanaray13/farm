// config -- model --- controllers --- routes --- server.js

//Llamada de express y el puerto
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors'); //Solicitud de origen cruzado

//Llamada a la configuración de MongoDB
require('./backend-farm/config/mongoose.config');

//Llamada a los middlewares (funciones intermedias)
app.use(cors());
app.use(express.json()); //Utiliza métodos HTTP y obtiene los datos en JSON
app.use(express.urlencoded({ extended: true }));  //Obtiene los datos de la URL

//Llamada a las rutas
const bodyParser = require("body-parser");
const accountRoutes = require('./backend-farm/routes/account.routes');
accountRoutes(app); //Envía los datos a account.routes

const animalRoutes = require('./backend-farm/routes/animal.routes');
animalRoutes(app); //Envía los datos a animal.routes

const penRoutes = require('./backend-farm/routes/pen.routes');
penRoutes(app); //Envía los datos a animal.routes

const { swaggerDocs: V1SwaggerDocs } = require("./backend-farm/routes/swagger");
app.use(bodyParser.json());

//Establecimiento del puerto
app.listen(port, () => {console.log("Servidor escuchando en el puerto", port); V1SwaggerDocs(app, port);})