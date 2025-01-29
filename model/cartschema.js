const mongoose = require ('mongoose')

const cartschema = mongoose.Schema({
      userid : {
           type : mongoose.Schema.Types.ObjectId,
           ref : "user"
       },
       products: [{

        productid : {
           type : mongoose.Schema.Types.ObjectId,
           ref : "product"
       },
       quantity : {
            type:String,
             default:1
       },
        price : {
             type:Number
        },
        discount : {
            type : Number
        },
        totalamount : {
          type:Number
     }

             
       }],
       Netamount : {
            type:Number
       }

    })

    module.exports = mongoose.model('cart',cartschema)