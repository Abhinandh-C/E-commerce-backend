 const mongoose = require('mongoose')

 const bannerschema = mongoose.Schema({

    title : {
        type : String,
        req : true
    },
    description : {
        type : String,
        req : true
    },
    image : {
        type : Array
    },
    createdAt : { 
        type :Date,
        default : Date.now
    }
    

 })

 module.exports = mongoose.model('banner',bannerschema)