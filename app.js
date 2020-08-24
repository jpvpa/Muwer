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
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
})

//rutas base
app.use('/users',userRoutes);
app.use('/artists',artistRoutes);
app.use('/albums',albumRoutes);
app.use('/songs',songRoutes);

module.exports = app;