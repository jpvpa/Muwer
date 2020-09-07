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
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
})

//rutas base
app.use('/api',userRoutes);
app.use('/api',artistRoutes);
app.use('/api',albumRoutes);
app.use('/api',songRoutes);

module.exports = app;