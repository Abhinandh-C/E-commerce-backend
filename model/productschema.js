const mongoose = require('mongoose');
const productschema = mongoose.Schema({
    
    product_name : {
        type: String,
        required:true
    },
    description : {
        type: String,required:true
    },
    price : {
        type: Number,
        required:true
    },
    category : {
        type : String,
        required:true
    },
    stock : {
        type : Number,
        required:true
    },
    rating : {
        type : Number,
        required:true
    },
    image : {
        type : Array
    }

})

module.exports = mongoose.model('product',productschema);