const express = require('express');
const router = express.Router()
const {viewuser,viewsingleuser, deleteuser, blockuser,viewblockuser} = require('../admincontroller/usermanagement')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')


router.get('/admin/viewuser',verifyToken,blacklist,viewuser)
router.get('/admin/viewsingleuser/:id',verifyToken,blacklist,viewsingleuser)
router.delete('/admin/deleteuser/:id',verifyToken,blacklist,deleteuser)
router.put('/admin/blockuser/:id',verifyToken,blacklist,blockuser)
router.get('/admin/viewblockuser',verifyToken,blacklist,viewblockuser)

module.exports=router

