const express = require('express')
const router = express.Router()
const allcategory = require('../controller/categorymodule')
const verifyToken = require('../middleware/tokenverification')
const blacklist = require('../middleware/blacklist')

router.get('/category',verifyToken,blacklist,allcategory)

module.exports = router