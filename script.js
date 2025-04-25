const env = require('dotenv')
const express = require ('express');
const app = express();
const db = require ('./DBconnect/DBconnect');
const router = require('./Router/authentication')
const forget = require('./Router/forget')
const reset = require('./Router/reset')
const product = require('./Router/product');
const viewuser = require('./Router/admin-usermanagement');
const userproduct = require('./Router/userside-product')
const category = require('./Router/category')
const profile = require('./Router/profile')
const wishlist = require('./Router/wishlist')
const cart = require('./Router/cart')
const coupon = require('./Router/admincoupon')
const order = require ('./Router/order')
const banner = require('./Router/bannerroute')
const dashboard = require('./Router/dash')
const cors =require('cors')


db()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods:['GET','POST','PUT','DELETE']
}));


app.use('/upload', express.static('public/upload'));

app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(forget)
app.use(reset)
app.use(product)
app.use(viewuser)
app.use(userproduct)
app.use(category)
app.use(profile)
app.use(wishlist)
app.use(cart)
app.use(coupon)
app.use(order)
app.use(banner)
app.use(dashboard)


env.config()
const PORT = process.env.port

app.listen(PORT,()=>{
    console.log("running");
    
})   