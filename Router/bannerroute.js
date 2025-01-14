const express = require('express');
const router = express.Router()
const {createbanner,updatebanner,deletebanner} = require('../admincontroller/bannermanagement');
const upload = require('../middleware/upload')
const verifyToken = require('../middleware/tokenverification')


router.post('/createbanner',upload.array('image',4),verifyToken,createbanner)
router.put('/updatebanner/:id',verifyToken,updatebanner)
router.delete('/deletebanner/:id',verifyToken,deletebanner)

module.exports = router