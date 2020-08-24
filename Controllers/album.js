'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination')

var Artist = require('../Models/Artist');
var Album = require('../Models/Album');
var Song = require('../Models/Song');

function getAlbum(req,res) {
    var albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else{
            if(!album){
                res.status(404).send({message: 'Album does not exists'});
            }else{
                res.status(200).send({album});
            }
        }
    })
}
function saveAlbum(req,res) {
    var album = new Album();
    
    var params  = req.body;

    album.title = params.title;
    album.description= params.description;
    album.year = params.year;
    album.duration = params.duration;
    album.label = params.label;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) =>{
        if(err){
            res.status(500).send({message: 'Error in saving the album'});
        }else{
            if(!albumStored){
                res.status(404).send({message:'The album has not be saved'});
            }else{
                res.status(200).send({album: albumStored});
            }
        }
    })
}

function getAlbums(req,res) {
    var artistId = req.params.artist;
    if(!artistId){
        //sacar todos los ablums de la base de datos
        var find = Album.find().sort('title');
    }else{
        //SAcar los albums de un articta especifico de la base de datos
        var find = Album.find({artist: artistId}).sort('year');
    }
    find.populate({path: 'artist'}).exec((err,albums) => {
        if(err){
            res.status(500).send({message: 'Error in the petition'});
        }else{
            if(!albums){
                res.status(404).send({message:'No artists available'});
            }else{
                return res.status(200).send({albums});
            }
        }
    })
    
}
function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update,(err, albumUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error in saving the artist'});
        }else{
            if(!albumUpdated){
                res.status(404).send({message:'Album has not been updated succesfully'});
            }else{
                return res.status(200).send({artist: albumUpdated});
            }
        }
    })
}
function deleteAlbum(req, res) {
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error in deleting the album'});
        }else{
            if(!albumRemoved){
                res.status(404).send({message:'Album has not been deleted'});
            }else{
                Song.find({artist: artistRemoved._id}).remove((err, songRemoved)=>{
                    if(err){
                        res.status(500).send({message: 'Error in deleting the song'});
                    }else{
                        if(!songRemoved){
                            res.status(404).send({message:'Song has not been deleted'});
                        }else{
                            res.status(200).send({album: albumRemoved}); 
                        }
                    }
                });
            }
        }
    });
}
function uploadImage(req,res) {
    var albumId =req.params.id;
    var fileName = 'No image uploaded...';

    if(req.files){
        var filePath = req.files.image.path;
        //Getting image name by dividing the path
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1]

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
            Album.findByIdAndUpdate(albumId, {image:fileName}, (err, albumUpdated)=>{
                if(!albumUpdated){
                    res.status(404).send({message: 'Album can not be updated'});
                }else{
                    res.status(200).send({album: albumUpdated}); 
                }
            });

        }else{
            res.status(200).send({message: 'Invalid file extension'}); 
        }
    }else{
        res.status(200).send({message: 'You have not uploaded an image'});
    }
    
}
 function getImageFile(req,res) {
     var imageFile = req.params.imageFile;
     var pathFile = './Uploads/Albums/'+imageFile;
     fs.exists(pathFile, (exists) =>{
         if(exists){
             //si existe el file
             res.sendFile(path.resolve(pathFile));
         }else{
             res.status(200).send({message:'Image does not exist'});
         }
     })
 }

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}