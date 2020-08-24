'use strict'

const express = require('express');
var artistController = require ('../Controllers/artist');
var api = express.Router();
var mdAuth = require('../Middlewares/authenticated');
var multipart = require('connect-multiparty');
var mdUpload = multipart({uploadDir: './Uploads/Artists'});

api.get('/artist/:id', mdAuth.ensureAuth, artistController.getArtist);
api.post('/artist', mdAuth.ensureAuth, artistController.saveArtist);
api.get('/artists/:page?', mdAuth.ensureAuth, artistController.getArtists);
api.put('/artist/:id', mdAuth.ensureAuth, artistController.updateArtist);
api.delete('/artist/:id', mdAuth.ensureAuth, artistController.deleteArtist);
api.post('/upload-image-artist/:id',  [mdAuth.ensureAuth, mdUpload], artistController.uploadImage);
api.get('/get-image-artist/:imageFile',   artistController.getImageFile);

module.exports = api;