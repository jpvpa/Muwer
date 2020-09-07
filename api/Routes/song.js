'use strict'

const express = require('express');
var songController = require ('../Controllers/song');
var api = express.Router();
var mdAuth = require('../Middlewares/authenticated');
var multipart = require('connect-multiparty');
var mdUpload = multipart({uploadDir: './Uploads/Songs'});

api.get('/song/:id', mdAuth.ensureAuth, songController.getSong);
api.post('/song', mdAuth.ensureAuth, songController.saveSong);
api.get('/songs/:album?', mdAuth.ensureAuth, songController.getSongs);
api.put('/song/:id', mdAuth.ensureAuth, songController.updateSong);
api.delete('/song/:id', mdAuth.ensureAuth, songController.deleteSong);
api.post('/upload-file-song/:id',  [mdAuth.ensureAuth, mdUpload], songController.uploadFile);
api.get('/get-song-file/:songFile',   songController.getSongFile);

module.exports = api;