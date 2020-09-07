'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination')

var Artist = require('../Models/Artist');
var Album = require('../Models/Album');
var Song = require('../Models/Song');

function getSong(req,res) {
    var songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, song)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else{
            if(!song){
                res.status(404).send({message: 'Song does not exists'});
            }else{
                res.status(200).send({song});
            }
        }
    })
}
function saveSong(req,res) {
    var song = new Song();
    
    var params  = req.body;

    song.number = params.number;
    song.name= params.name;
    song.duration = params.duration;
    song.file = 'null';
    song.album = params.album;
    song.explicit = params.explicit;

    song.save((err, songStored) =>{
        if(err){
            res.status(500).send({message: 'Error in saving the song'});
        }else{
            if(!songStored){
                res.status(404).send({message:'The song has not be saved'});
            }else{
                res.status(200).send({song: songStored});
            }
        }
    }) 
}
function getSongs(req,res) {
    var albumId = req.params.album;
    if(!albumId){
        //sacar todos los ablums de la base de datos
        var find = Song.find().sort('number');
    }else{
        //SAcar los albums de un articta especifico de la base de datos
        var find = Song.find({album: albumId}).sort('number');
    }
    find.populate({path: 'album', populate: {path: 'artist', model:'Artist'}
        }).exec((err,songs) => {
        if(err){
            res.status(500).send({message: 'Error in the petition'});
        }else{
            if(!songs){
                res.status(404).send({message:'No Songs available'});
            }else{
                return res.status(200).send({songs});
            }
        }
    })
}
function updateSong(req, res) {
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update,(err, songUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error in saving the artist'});
        }else{
            if(!songUpdated){
                res.status(404).send({message:'Song has not been updated succesfully'});
            }else{
                return res.status(200).send({song: songUpdated});
            }
        }
    })
}
function deleteSong(req, res) {
    var songId = req.params.id;

    Song.findByIdAndRemove(songId, (err, songRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error in deleting the song'});
        }else{
            if(!songRemoved){
                res.status(404).send({message:'Song has not been deleted'});
            }else{
                return res.status(200).send({song: songRemoved});
            }
        }
    });
}
function uploadFile(req,res) {
    var songId =req.params.id;
    var fileName = 'No image uploaded...';

    if(req.files){
        var filePath = req.files.file.path;
        //Getting image name by dividing the path
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1]
        console.log(fileExt);
        console.log(fileName);
        if(fileExt == 'mp3' || fileExt == 'mp4' || fileExt == 'm4a'){
            Song.findByIdAndUpdate(songId, {file:fileName}, (err, songUpdated)=>{
                console.log(songId)
                console.log(fileName);
                console.log(songUpdated);
                if(!songUpdated){
                    res.status(404).send({message: 'Song can not be updated'});
                }else{
                    res.status(200).send({song: songUpdated}); 
                }
            });

        }else{
            res.status(200).send({message: 'Invalid file extension'}); 
        }
    }else{
        res.status(200).send({message: 'You have not uploaded an image'});
    }
    
}
 function getSongFile(req,res) {
     var songFile = req.params.songFile;
     var pathFile = './Uploads/Songs/'+songFile;
     fs.exists(pathFile, (exists) =>{
         console.log(exists)
         if(exists){
             //si existe el file
             res.sendFile(path.resolve(pathFile));
         }else{
             res.status(200).send({message:'Audio does not exist'});
         }
     });
 }

module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
}