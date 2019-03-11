var express = require("express")
import bodyParser = require("body-parser")
import { handlerErrors } from './handlers/errors.handler';
import mongoose = require("mongoose")
import {router as routesProductos} from './api/routes/producto.route'
import {router as routerUsuarios} from "./api/routes/usuario.route"
import cors = require("cors")
import methodOverride = require('method-override');
import  cookieParser = require('cookie-parser');
// Definición de constantes
//const PORT = process.env.PORT || 3000
// Declaración de variables
const app = express();
// Conexión a Mongo
mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://diewoo:diewoo@cluster0-rda0p.mongodb.net/test?retryWrites=true`, {useNewUrlParser: true, useCreateIndex: true})
mongoose.connection.on("connected", ()=> console.log("Conectado a Mongo"))
mongoose.connection.on("error", error => console.log(error))

// Middlewares
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1/productos', routesProductos);
app.use("/api/v1/usuarios", routerUsuarios)
// Manejo de errores
app.use(handlerErrors.notFound);
app.use(handlerErrors.general);
// error handler

module.exports = app;