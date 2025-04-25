const express = require ('express');
const {signup,login,logout} = require('../controller/authenticationlogic')
const router = express.Router()
const blacklist = require('../middleware/blacklist')

//router given in the postman
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)


module.exports = router
  