const express = require('express')
const router = express.Router()
const {updateprofile,viewuserprofile,deleteprofile, changepassword} = require('../controller/profilemanagement')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')

router.get('/viewprofile',verifyToken,blacklist,viewuserprofile)
router.delete('/deleteprofile',verifyToken,blacklist,deleteprofile)
router.put('/updateprofile',verifyToken,blacklist,updateprofile)
router.put('/changepassword',verifyToken,blacklist,changepassword)

module.exports = router