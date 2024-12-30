const mongoose = require('mongoose');
const productschema = mongoose.Schema({
    
    product_name : {
        type: String,
        require:true
    },
    description : {
        type: String,require:true
    },
    price : {
        type: Number,
        require:true
    },
    category : {
        type : String,
        require:true
    },
    stock : {
        type : Number,
        require:true
    },
    image : {
        type : Array
    }

})

module.exports = mongoose.model('product',productschema);