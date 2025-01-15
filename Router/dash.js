const express = require('express')
const router = express.Router()
const {recentorder,topSellingProducts,inventoryStatus} = require('../admincontroller/dashboard')
const verifyToken = require('../middleware/tokenverification')


router.get('/recentorder',verifyToken,recentorder)
router.get('/topSellingProducts',verifyToken,topSellingProducts)
router.get('/inventoryStatus',verifyToken,inventoryStatus)

module.exports = router