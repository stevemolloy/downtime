const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');

//Connect to operations knowledge base
mongoose.connect('mongodb://localhost/maxivkb');
let db = mongoose.connection;


//Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check for DB erros
db.on('error', function(err){
    console.log('err');
});

// Initialize app
const app = express();

// Bring in Models
let Downtimeevent = require('./models/downtimeevents');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

// Home Route
app.get('/',function(req, res){
    Downtimeevent.find({}, function(err,downtimeevents){
        if(err){
            console.log(err);
        } else{
            res.render('index',{
                downtimeevents:downtimeevents
            });
        }
    });
});

// Single event Route
app.get('/downtimeevent/:id', function(req, res){
    Downtimeevent.findById(req.params.id, function(err, downtimeevent){
        res.render('downtimeevent',{
            downtimeevent:downtimeevent  
        });
    });
});




//Add submit Route
app.get('/submit',function(req, res){
    res.render('submit', {
        title: 'Submit entry',
    });
});

// Add Submit POST Route
app.post('/submit',function(req, res){
    let downtimeevent = new Downtimeevent();
    downtimeevent.code = req.body.code;
    downtimeevent.cause = req.body.cause;
    downtimeevent.operator = req.body.operator;
    downtimeevent.description = req.body.description;
    downtimeevent.solution = req.body.solution;
    downtimeevent.longtermeffects = req.body.longtermeffects;
    downtimeevent.date = req.body.date;
    downtimeevent.time = req.body.time;
    downtimeevent.duration = req.body.duration;


    downtimeevent.save(function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    });
});

// Edit events route
app.get('/downtimeevent/edit/:id', function(req, res){
    Downtimeevent.findById(req.params.id, function(err, downtimeevent){
        res.render('edit_downtimeevent',{
            title:'Edit Downtimeevent',
            downtimeevent:downtimeevent  
        });
    });
});

// update Submissions POST Route
app.post('/downtimeevent/edit/:id',function(req, res){
    let downtimeevent  = {}
    downtimeevent.code = req.body.code;
    downtimeevent.cause = req.body.cause;
    downtimeevent.operator = req.body.operator;
    downtimeevent.description = req.body.description;
    downtimeevent.solution = req.body.solution;
    downtimeevent.longtermeffects = req.body.longtermeffects;
    downtimeevent.date = req.body.date;
    downtimeevent.time = req.body.time;
    downtimeevent.duration = req.body.duration;

    let query ={_id:req.params.id};

    
    Downtimeevent.update(query, downtimeevent, function(err){
        if(err){
            console.log(err);
        } else{ 
            res.redirect('/');
        }
    });
});

app.delete('/downtimeevent/:id', function(req, res){
    let query = {_id:req.params.id};

    Downtimeevent.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});


//Add About Route
app.get('/about',function(req, res){
    res.render('about', {
        title: 'About',
    });
});


//start server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});
