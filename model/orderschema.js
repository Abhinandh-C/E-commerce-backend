const mongoose = require('mongoose')
const address = require('./address')

const orderschema = mongoose.Schema({

     userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
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
             totalamount : {
               type:Number
          }
             
            }],
    Netamount : {
             type:Number
              },
              totalPriceAfterDiscount : {
                type:Number
                 },
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "address"

    },
    Status : {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending'
    },
    paymentMethod: {
        type : String,
        enum : ['COD','OnlinePayment'],
        default : true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    
})


module.exports =  mongoose.model('order',orderschema)