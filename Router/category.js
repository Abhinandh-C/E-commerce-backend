const express = require('express')
const router = express.Router()
const allcategory = require('../controller/categorymodule')

router.get('/category',allcategory)

module.exports = router