'use strict'

const express = require('express');
var albumController = require ('../Controllers/album');
var api = express.Router();
var mdAuth = require('../Middlewares/authenticated');
var multipart = require('connect-multiparty');
var mdUpload = multipart({uploadDir: './Uploads/Albums'});

api.get('/album/:id', mdAuth.ensureAuth, albumController.getAlbum);
api.post('/album', mdAuth.ensureAuth, albumController.saveAlbum);
api.get('/albums/:artist?', mdAuth.ensureAuth, albumController.getAlbums);
api.put('/album/:id', mdAuth.ensureAuth, albumController.updateAlbum);
api.delete('/album/:id', mdAuth.ensureAuth, albumController.deleteAlbum);
api.post('/upload-image-album/:id',  [mdAuth.ensureAuth, mdUpload], albumController.uploadImage);
api.get('/get-image-album/:imageFile',   albumController.getImageFile);

module.exports = api;