let mongoose = require('mongoose');

// downtime entry structure schema
let downtimeeventSchema= mongoose.Schema({
    code:{
        type: String,
        required: false
    },
    operator:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: false
    },
    cause:{
        type:String,
        required: false
    },
    solution:{
        type:String,
        required: false
    },
    longtermeffects:{
        type:String,
        required: false
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
        required: false
    }
});

let downtimeevent = module.exports = mongoose.model('downtimeevent',downtimeeventSchema);
