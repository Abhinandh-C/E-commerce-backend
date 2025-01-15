const express = require('express')
const router = express.Router()
const {getproduct,singleproduct} = require('../controller/productmodule')


router.get('/product',getproduct)
router.get('/product/:id',singleproduct)
module.exports=router