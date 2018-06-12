let mongoose = require('mongoose')

// downtime entry structure schema
let downtimeeventSchema= mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    operator:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    solution:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    duration:{
        type:Number,
        required: true
    }
});

let downtimeevent = module.exports = mongoose.model('downtimeevent',downtimeeventSchema);
