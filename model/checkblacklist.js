const mongoose = require('mongoose');

//define schema
const blacklistschema = new mongoose.Schema({
    token: {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
    
})

module.exports = mongoose.model('blacklist',blacklistschema)