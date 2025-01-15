const express = require('express');
const router = express.Router()
const {placeanorder,cancelorder,vieworder} = require('../controller/ordermanagement')
const {deleteorder,viewallorder,updatestatus} =require('../admincontroller/adminordermanagement')
const verifyToken = require('../middleware/tokenverification')

router.post('/placeanorder',verifyToken,placeanorder)
router.delete('/deleteorder/:id',verifyToken,deleteorder)
router.put('/cancelorder/:id',verifyToken,cancelorder)
router.get('/vieworder/:id',verifyToken,vieworder)
router.get('/viewallorder',verifyToken,viewallorder)
router.put('/updateorder/:id',verifyToken,updatestatus)

module.exports = router