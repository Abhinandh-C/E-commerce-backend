const express = require('express');
const router = express.Router()
const {addproduct,updateproduct,deleteproduct,viewproduct, viewproductid} = require('../admincontroller/product_management');
const upload = require('../middleware/upload')

router.post('/admin/addproduct',upload.array('image',4),addproduct)
router.put('/admin/updateproduct/:id',updateproduct)
router.delete('/admin/deleteproduct/:id',deleteproduct)
router.get('/admin/viewproduct',viewproduct)
router.get('/admin/viewproduct/:id',viewproductid)



module.exports = router