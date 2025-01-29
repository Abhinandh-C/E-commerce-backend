const express = require('express')
const router = express.Router()
const {recentorder,topSellingProducts,inventoryStatus} = require('../admincontroller/dashboard')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')


router.get('/recentorder',verifyToken,blacklist,recentorder)
router.get('/topSellingProducts',verifyToken,blacklist,topSellingProducts)
router.get('/inventoryStatus',verifyToken,blacklist,inventoryStatus)

module.exports = router