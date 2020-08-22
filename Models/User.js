'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = Schema({
    name: String,
    surname:String,
    email:String,
    password:String,
    role:String,
    image:String,
    playlist:  { type: Schema.ObjectId, ref: 'Playlist'},
    songs:  { type: Schema.ObjectId, ref: 'Song'},
    album:  { type: Schema.ObjectId, ref: 'Album'},
    artist:  { type: Schema.ObjectId, ref: 'Artist'},
})

module.exports = mongoose.model('User', User, 'Users');