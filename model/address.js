const mongoose = require('mongoose')

const addressschema = mongoose.Schema ({
    
     userid : {
               type : mongoose.Schema.Types.ObjectId,
               ref : "user"
           },
    firstName : {
                type : String,
                require : true
    },
    email:{
        type: String,
        require : true
    },
    PhoneNumber : {
                type : Number,
                require : true
    },
    address : {
                type : String,
                require : true
    },
    city : {
            type : String,
            require : true
    },
    state : {
            type : String,
            require : true
    },
    pincode : {
            type : Number,
            require : true
    },
    country : {
            type : String,
            require : true
    }
    
})

module.exports = mongoose.model('address',addressschema)