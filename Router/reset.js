const express = require('express');
const router = express.Router()
const resetpassword = require('../controller/resetpassword')

router.post('/resetpassword/:token',resetpassword)

module.exports= router