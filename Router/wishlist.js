const express = require('express')
const router  = express.Router()
const {addwishlist,viewwishlist, removefromwishlist} = require('../controller/wishlistcontroll')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')

router.post('/wishlist/:id',verifyToken,blacklist,addwishlist)
router.get('/viewwishlist',verifyToken,blacklist,viewwishlist)
router.delete('/removefromwishlist/:id',verifyToken,blacklist,removefromwishlist)

module.exports = router