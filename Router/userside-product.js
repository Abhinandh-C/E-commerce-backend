const express = require('express')
const router = express.Router()
const {getproduct,singleproduct} = require('../controller/productmodule')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')

router.get('/product',verifyToken,blacklist,getproduct)
router.get('/product/:id',verifyToken,blacklist,singleproduct)
module.exports=router