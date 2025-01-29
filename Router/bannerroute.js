const express = require('express');
const router = express.Router()
const {createbanner,updatebanner,deletebanner} = require('../admincontroller/bannermanagement');
const upload = require('../middleware/upload')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')


router.post('/createbanner',upload.array('image',4),verifyToken,blacklist,createbanner)
router.put('/updatebanner/:id',verifyToken,blacklist,updatebanner)
router.delete('/deletebanner/:id',verifyToken,blacklist,deletebanner)

module.exports = router