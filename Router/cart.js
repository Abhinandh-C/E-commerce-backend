const express = require('express')
const router = express.Router()
const {addtocart,viewcart,removefromcart,updatecartquantity,applycoupon} = require('../controller/cartcontroller')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')

router.post('/addtocart/:id',verifyToken,blacklist,addtocart)
router.get('/viewcart',verifyToken,blacklist,viewcart)
router.delete('/removefromcart/:id',verifyToken,blacklist,removefromcart)
router.put('/updatecart/:id',verifyToken,blacklist,updatecartquantity)
router.post('/applycoupon/:id',verifyToken,blacklist,applycoupon)

module.exports = router