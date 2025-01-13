const mongoose = require('mongoose');
const wishlistschema= mongoose.Schema({
    
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    productid : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    }]
})

module.exports = mongoose.model('wishlist',wishlistschema)