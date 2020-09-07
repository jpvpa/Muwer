'use strict'

const express = require('express');
var userController = require ('../Controllers/user');
var mdAuth = require('../Middlewares/authenticated');
var multipart = require('connect-multiparty');
var api = express.Router();

var mdUpload = multipart({uploadDir: './Uploads/Users'});

api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);
api.get('/profile', mdAuth.ensureAuth ,userController.profile);
api.put('/update-user/:id',  mdAuth.ensureAuth, userController.updateUser);
api.post('/upload-image-user/:id',  [mdAuth.ensureAuth, mdUpload], userController.uploadImage);
api.get('/get-image-user/:imageFile',   userController.getImageFile);

module.exports = api;