'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Album = Schema({
    id:Number,
    title: String,
    description:String,
    year:Number,
    duration:String,
    image:String,
    label:String,
    artist: { type: Schema.ObjectId, ref: 'Artist'}
})

module.exports = mongoose.model('Album', Album, 'Albums');