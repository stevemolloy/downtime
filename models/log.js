let mongoose = require('mongoose')

// logbook entry structure schema
let logbook_schema = mongoose.Schema({
    timestamp:{type:Number, required: true},
    duration:{type:Number, required: true},
    code:{type:String, required: true},
    description:{type:String, required: true},
    solution:{type:String, required: true}
});

let Logbook = module.exports = mongoose.model('Logbook',logbook_schema);
