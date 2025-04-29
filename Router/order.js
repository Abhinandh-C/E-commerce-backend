const express = require('express');
const router = express.Router()
const {placeanorder,cancelorder,vieworder} = require('../controller/ordermanagement')
const {deleteorder,viewallorder,updatestatus} =require('../admincontroller/adminordermanagement')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')

router.post('/placeanorder/:id',verifyToken,blacklist,placeanorder)
router.delete('/deleteorder/:id',verifyToken,blacklist,deleteorder)
router.put('/cancelorder/:id',verifyToken,blacklist,cancelorder)
router.get('/vieworder/:id',verifyToken,blacklist,vieworder)
router.get('/viewallorder',verifyToken,blacklist,viewallorder)
router.put('/updateorder/:id',verifyToken,blacklist,updatestatus)

module.exports = router