const express = require('express')
const router = express.Router()
const {updateprofile,viewuserprofile,deleteprofile, changepassword} = require('../controller/profilemanagement')
const verifyToken = require('../middleware/tokenverification')

router.get('/viewprofile',verifyToken,viewuserprofile)
router.delete('/deleteprofile',verifyToken,deleteprofile)
router.put('/updateprofile',verifyToken,updateprofile)
router.put('/changepassword',verifyToken,changepassword)

module.exports = router