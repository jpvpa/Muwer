'user strict'

const mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Muwer', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
},(error) =>{
    if(error){
        console.log('Error al conectarse a la base de datos');
        console.log(error);
    }else{
        console.log('Se ha conectado a la base de datos satisfactoriamente ');
        app.listen(port, function(){
            console.log('Servidor del api rest de Muwer http://localhost:'+port);
        })
    }
});