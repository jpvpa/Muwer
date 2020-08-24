'use strict'
const express = require ('express');
const bodyParser = require ('body-parser');

var app = express();

//Routes
var userRoutes = require('./Routes/user');
var artistRoutes = require('./Routes/artist');
var albumRoutes = require('./Routes/album');
var songRoutes = require('./Routes/song');

app.use(bodyParser.urlencoded({extender:false}));
app.use(bodyParser.json());

//Configurar cabeceras http

//rutas base
app.use('/users',userRoutes);
app.use('/artists',artistRoutes);
app.use('/albums',albumRoutes);
app.use('/songs',albumRoutes);

module.exports = app;