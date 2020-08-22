'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Playlist = Schema({
    id:Number,
    name: String,
    song:{ type: Schema.ObjectId, ref: 'Song'},
    image:String,
    album: { type: Schema.ObjectId, ref: 'Album'},
})

module.exports = mongoose.model('Playlist', Playlist,'Playlists');