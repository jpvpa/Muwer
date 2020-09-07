'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Artist = Schema({
    name: String,
    description:String,
    image:String
})

module.exports = mongoose.model('Artist', Artist, 'Artists');