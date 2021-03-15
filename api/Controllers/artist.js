'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination')

var Artist = require('../Models/Artist');
var Album = require('../Models/Album');
var Song = require('../Models/Song');

function getArtist(req,res) {
    var artistId = req.params.id;
    Artist.findById(artistId,(err, artist)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else{
            if(!artist){
                res.status(404).send({message: 'Artist does not exists'});
            }else{
                res.status(200).send({artist});
            }
        }
    })
}
function saveArtist(req,res) {
    var artist = new Artist();
    
    var params  = req.body;

    artist.name = params.name;
    artist.description= params.description;
    artist.image = 'null';

    artist.save((err, artistStored) =>{
        if(err){
            res.status(500).send({message: 'Error in saving the artist'});
        }else{
            if(!artistStored){
                res.status(404).send({message:'The artist has not be saved'});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    })
}

function getArtists(req,res) {
    if(req.params.page){
        var page = req.params.page ;  
    }else{
        var page = 1;
    }
    var itemsPerPage = 4;

    Artist.find().sort('name').paginate(page, itemsPerPage, (err,artists,total) => {
        if(err){
            res.status(500).send({message: 'Error in the petition'});
        }else{
            if(!artists){
                res.status(404).send({message:'No artists available'});
            }else{
                return res.status(200).send({
                    totalItems: total,
                    artists: artists
                });
            }
        }
    })
}
function updateArtist(req, res) {
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update,(err, artistUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error in saving the artist'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message:'Artist has not been updated succesfully'});
            }else{
                return res.status(200).send({artist: artistUpdated});
            }
        }
    })
}

function deleteArtist(req, res) {
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId,(err,artistRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error in deleting the artist'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message:'Artist has not been deleted succesfully'});
            }else{
                Album.find({artist: artistRemoved._id}).remove((err, albumRemoved)=>{
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
                                        res.status(200).send({artis: artistRemoved}); 
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    })
}

function uploadImage(req,res) {
    var artistId =req.params.id;
    var fileName = 'No image uploaded...';

    if(req.files){
        var filePath = req.files.image.path;
        //Getting image name by dividing the path
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1]

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
            Artist.findByIdAndUpdate(artistId, {image:fileName}, (err, artistUpdated)=>{
                if(!artistUpdated){
                    res.status(404).send({message: 'Album can not be updated'});
                }else{
                    res.status(200).send({artist: artistUpdated}); 
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
     var pathFile = './Uploads/Artists/'+imageFile;
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
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}