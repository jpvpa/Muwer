'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Song = Schema({
    id:Number,
    number:Number,
    name: String,
    duration:String,
    file:String,
    explicit: Boolean,
    album: { type: Schema.ObjectId, ref: 'Album'}
})

module.exports = mongoose.model('Song', Song, 'Songs');