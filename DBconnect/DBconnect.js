const mongoose = require('mongoose');

//function creating
async function connectdb() {
    await mongoose.connect('mongodb+srv://abhinandh20011:lbmc6GAVPwM64Dja@ecommerce.6mcxn51.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce')
    console.log('DBrunning');
    
    
}
module.exports = connectdb;