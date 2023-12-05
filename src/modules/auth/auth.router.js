const authController = require ("./controller/registration.js")
const express = require('express')
const router = express.Router()

router.post('/signUp',authController.signUp)
router.post('/signIn',authController.signIn)


module.exports = router