'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Song = Schema({
    id:Number,
    number:Number,
    name: String,
    duration:String,
    image:String,
    album: { type: Schema.ObjectId, ref: 'Album'}
})

module.exports = mongoose.model('Song', Song, 'Songs');