const mongoose = require ('mongoose')
const userschema = mongoose.Schema({
    name : {type:String,require:true},
    email : {type:String,require:true,unique:true},
    password : {type:String,require:true},
    role : {type:String,enum:['admin','user'],default:'user'},
    token : {type: String}

})     

module.exports=mongoose.model('user',userschema);