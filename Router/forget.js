const express = require('express');
const router = express.Router()
const forgetpassword = require('../controller/forgetpassword')

router.post ('/forgetpassword',forgetpassword)

module.exports= router  