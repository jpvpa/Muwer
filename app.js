'use strict'
const express = require ('express');
const bodyParser = require ('body-parser');

var app = express();

//Routes
var userRoutes = require('./Routes/user');

app.use(bodyParser.urlencoded({extender:false}));
app.use(bodyParser.json());

//Configurar cabeceras http

//rutas base
app.use('/user',userRoutes);


module.exports = app;