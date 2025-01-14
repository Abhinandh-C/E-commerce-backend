const express = require('express');
const router = express.Router()
const {viewuser,viewsingleuser, deleteuser, blockuser,viewblockuser} = require('../admincontroller/usermanagement')


router.get('/admin/viewuser',viewuser)
router.get('/admin/viewsingleuser/:id',viewsingleuser)
router.delete('/admin/deleteuser/:id',deleteuser)
router.put('/admin/blockuser/:id',blockuser)
router.get('/admin/viewblockuser',viewblockuser)

module.exports=router

