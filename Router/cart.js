const express = require('express')
const router = express.Router()
const {addtocart,viewcart,removefromcart,updatecartquantity} = require('../controller/cartcontroller')
const verifyToken = require('../middleware/tokenverification')


router.post('/addtocart/:id',verifyToken,addtocart)
router.get('/viewcart',verifyToken,viewcart)
router.delete('/removefromcart/:id',verifyToken,removefromcart)
router.put('/updatecart/:id',verifyToken,updatecartquantity)

module.exports = router