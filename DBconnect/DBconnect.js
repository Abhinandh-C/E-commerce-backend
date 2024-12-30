const mongoose = require('mongoose');
async function connectdb() {
    await mongoose.connect('mongodb://localhost:27017/backend')
    console.log('DBrunning');
    
    
}
module.exports = connectdb;