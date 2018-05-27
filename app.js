const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//Connect to operations knowledge base
mongoose.connect('mongodb://localhost/maxivkb');
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
let downtimeevent = require('./models/downtimeevents');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/',function(req, res){
    downtimeevent.find({}, function(err,downtimeevents){
        if(err){
            console.log(err);
        } else{
            res.render('index',{
                title: 'Hello!!!',
                downtimeevents:downtimeevents
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
