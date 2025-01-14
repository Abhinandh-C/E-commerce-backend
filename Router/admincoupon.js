const express = require('express')
const router = express.Router()
const {createcoupon,viewcoupon,updatecoupon, deletecoupon} = require('../admincontroller/couponmanagement')
const verifyToken = require('../middleware/tokenverification')

router.post('/createcoupon',verifyToken,createcoupon)
router.get('/viewcoupon',verifyToken,viewcoupon)
router.put('/updatecoupon/:id',verifyToken,updatecoupon)
router.delete('/deletecoupon/:id',verifyToken,deletecoupon)

module.exports = router