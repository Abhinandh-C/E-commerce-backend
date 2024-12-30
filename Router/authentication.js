const express = require ('express');
const {signup,login} = require('../controller/authenticationlogic')

const router = express.Router()

//router given in the postman
router.post('/signup',signup)
router.post('/login',login)


module.exports = router
  