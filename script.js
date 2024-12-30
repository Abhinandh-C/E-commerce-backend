const env = require('dotenv')
const express = require ('express');
const app = express();
const db = require ('./DBconnect/DBconnect');
// const cookieParser = require('cookie-parser');
const router = require('./Router/authentication')
const forget = require('./Router/forget')
const reset = require('./Router/reset')
const product = require('./Router/product')
db()

app.use(express.json())
app.use(express.urlencoded () )
// app.use(cookieParser)
app.use(router)
app.use(forget)
app.use(reset)
app.use(product)

env.config()
const PORT = process.env.port

app.listen(PORT,()=>{
    console.log("running");
    
})  