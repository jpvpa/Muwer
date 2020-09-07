'use strict'

var jwt =require('jwt-simple');
var moment = require('moment');
var secret = 'secretKeyMuwer';

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).send({message: 'The petition does not have the auth headers'});

    }
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()){
            return res.status(401).send({message: 'The token has expired'});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'No valid token'});
    }
    req.user = payload;

    next();
};