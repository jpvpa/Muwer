'use strict'

var fs = require('fs');
var path = require('path');
var User = require('../Models/User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Services/jwt');


function profile(req,res){
    res.status(200).send({message: 'profile'}); 
}

function saveUser(req,res){

    var user = new User();
    var params = req.body;
    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){
        //encriptar contraseña y guardar datos
        bcrypt.hash(params.password, null,null, (err,hash) =>{
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                //Guarda el usuario
                user.save((err,userStored)=>{
                    if(err){
                        res.status(500).send({mensaje:'There was an error saving the user'}); 
                    }else{
                        if(!userStored){
                            res.status(404).send({mensaje:'User has not been registered'}); 
                        }else{
                            res.status(200).send({user:userStored}); 
                        }
                    }
                });
            }else{
                res.status(200).send({mensaje:'Fill the required fields'});
            }
        })
    }else{
        res.status(500).send({mensaje:'Introduce the password'});
    }
}
function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user)=>{
        if(err){
            res.status(500).send({message: 'Error in the peticion'});
        }else{
            if(!user){
                res.status(404).send({message: 'User does not exist'});
            }else{
                //Comprobar la contraseña
                bcrypt.compare(password, user.password, (err, check)=>{
                    if(check){
                        //Devolver los datos del usuario logueado
                        if(params.gethash){
                            //Devolver un token de JWT
                            res.status(200).send({token: jwt.createtoken(user)});
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'User can not log in'});
                    }
                })
            }
        }
    })
}

function updateUser(req,res) {
    var userId = req.params.id;
    var update = req.body;
    if(userId != req.user.sub){
        return res.status(500).send({message: 'You are not allowed to update this user'});
    }
    User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
        if(err){
            res.status(500).send({message: 'There was an error updating the user'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'User can not be updated'});
            }else{
                res.status(200).send({userUpdated}); 
            }
        }
    });
}

function uploadImage(req,res) {
    var userId =req.params.id;
    var fileName = 'No image uploaded...';

    if(req.files){
        var filePath = req.files.image.path;
        //Getting image name by dividing the path
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1]

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif' || fileExt == 'jpeg' || fileExt == 'JPG'){
            User.findByIdAndUpdate(userId, {image:fileName}, (err, userUpdated)=>{
                if(!userUpdated){
                    res.status(404).send({message: 'User can not be updated'});
                }else{
                    res.status(200).send({image: fileName,user: userUpdated}); 
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
     var pathFile = './Uploads/Users/'+imageFile;
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
    profile,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}