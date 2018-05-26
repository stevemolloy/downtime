const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/downtime');
let db = mongoose.connection;


//Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
})

// Check for DB erros
db.on('error', function(err){
    console.log('err');
});

// Initialize app
const app = express();

// Bring in Models
let Logbook = require('./models/log');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/',function(req, res){
    Logbook.find({}, function(err,logbook){
        if(err){
            console.log(err);
        } else{
            res.render('index',{
                title: 'Hello!!!',
                logbook: logbook
            });    
        }
    });
});

//Add Route
app.get('/submit',function(req, res){
    res.render('submit', {
        title: 'submit entry',
    });
});



//start server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});
