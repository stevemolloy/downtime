var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
//for file output
var fs = require('fs');

var app = express();
/*
var logger = function(req, res, next){
    console.log('logging...');
    next();
}

app.use(logger);
*/

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
      return {
        param: formParam,
        msg: msg,
        value: value
    };
  }
}));


app.get('/', function(req, res) {
    res.render('index', {
      title: 'Downtime',
    });
});

app.post('/event/add', function(req, res) {

    req.checkBody('alarm', 'Alarm name is required.').notEmpty();
    req.checkBody('code', 'Code is required.').notEmpty();
    req.checkBody('downtime', 'Downtime is required.').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log('Input missing!');
    }
    else{
        var newEvent = {
            alarm: req.body.alarm,
            code: req.body.code,
            downtime: req.body.downtime
        }
        console.log('Success');
    }

    if(newEvent){
        console.log(newEvent);
        var stream = fs.createWriteStream("downtimelog.txt", {
            flags: 'a'
    });
        stream.write(newEvent.alarm + ', ' + newEvent.code + ', ' + newEvent.downtime + ',')
        stream.write("\n")

    }
  res.redirect('/');
});

var content
//Read the file
fs.readFile('downtimelog.txt', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data
    content = content.split("\n");
    console.log(content);
});

app.get('/downtimelog', function(req, res) {
    res.render('downtimelog', {
        title: 'Downtime Log',
        data: '444',
        content})
}); 


app.listen(3000, function() {
  console.log('Server started on port 3000...');
})
