const express = require('express');
const router = express.Router()
const {addproduct,updateproduct,deleteproduct,viewproduct, viewproductid} = require('../admincontroller/product_management');
const upload = require('../middleware/upload')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')

router.post('/admin/addproduct',upload.array('image',4),verifyToken,blacklist,addproduct)
router.put('/admin/updateproduct/:id',verifyToken,blacklist,updateproduct)
router.delete('/admin/deleteproduct/:id',verifyToken,blacklist,deleteproduct)
router.get('/admin/viewproduct',verifyToken,blacklist,viewproduct)
router.get('/admin/viewproduct/:id',verifyToken,blacklist,viewproductid)



module.exports = router