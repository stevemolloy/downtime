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
app.set('views',path.join(__dirname,'views'));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while (namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg :msg,
            value : value
        };
    }
}));

/*var users = [
    {
        id: 1,
        alarm: 'vac error',
        code: 'VAC',
        downtime: '1',
    },
    {
        id: 2,
        alarm: 'Pigeon in linac',
        code: 'PGN',
        downtime: '12',
    },
    {
        id: 3,
        alarm: 'R1 exploded',
        code: 'r1EXPL',
        downtime: '999',
    }
]
*/
app.get('/', function(req, res){
    res.render('index',{
        title: 'Downtime',
        //events:events
    });
});

app.post('/event/add',function(req,res){

    req.checkBody('alarm', 'Alarm name is required.').notEmpty();
    req.checkBody('code', 'Code is required.').notEmpty();
    req.checkBody('downtime', 'Downtime is required.').notEmpty();

    var newEvent = {
        alarm: req.body.alarm,
        code: req.body.code,
        downtime: req.body.downtime
    }

    console.log(newEvent);

//    fs.writeFileSync('downtimelog.txt', newEvent.alarm, {'flags': 'a+'});
    var stream = fs.createWriteStream("downtimelog.txt", {flags:'a'});
    stream.write(newEvent.alarm+', '+ newEvent.code+', '+ newEvent.downtime+',')
    stream.write("\n")
    /*
    fs.writeFile('downtimelog.txt', newEvent.code, (err) => {  
        //if error
        if (err) throw err;
        //if success
        console.log('code saved');
    })
    fs.writeFile('downtimelog.txt', newEvent.downtime, (err) => {  
        //if error
        if (err) throw err;
        //if success
        console.log('downtime saved');
    })*/
    });

app.listen(3000,function(){
    console.log('Server started on port 3000...');
})
