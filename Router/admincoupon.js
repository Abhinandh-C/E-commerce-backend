const express = require('express')
const router = express.Router()
const {createcoupon,viewcoupon,updatecoupon, deletecoupon} = require('../admincontroller/couponmanagement')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')

router.post('/createcoupon',verifyToken,blacklist,createcoupon)
router.get('/viewcoupon',verifyToken,blacklist,viewcoupon)
router.put('/updatecoupon/:id',verifyToken,blacklist,updatecoupon)
router.delete('/deletecoupon/:id',verifyToken,blacklist,deletecoupon)

module.exports = router