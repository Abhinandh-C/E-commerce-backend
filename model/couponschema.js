const mongoose = require('mongoose')

const couponschema = mongoose.Schema({

    name : {
        type : String,
        req :true,
        unique : true,
        uppercase : true
    },
    expiry : {
        type : Date,
        req : true
    },
    discount : {
        type : Number,
        req : true
    }

})

module.exports = mongoose.model('coupon', couponschema)