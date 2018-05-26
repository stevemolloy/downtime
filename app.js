const express = require('express');
const path = require('path');

// Initialize app
const app = express();

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/',function(req, res){
    let log = [
        {
            id:1,
            //timestamp:25,
            //duration: 36,
            //code: 'VAC',
            description: 'This is what happened',
            //solution: 'This is how it was solved'
        },
        {
            id:2,
            //timestamp:25,
            //duration: 36,
            //code: 'VAC',
            description: 'This is what happened',
            //solution: 'This is how it was solved'
        },
        {
            id:3,
            //timestamp:25,
            //duration: 36,
            //code: 'VAC',
            description: 'This is what happened',
            //solution: 'This is how it was solved'
        }
    ];
    res.render('index',{
        title: 'Hello!!!',
        log: log
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
