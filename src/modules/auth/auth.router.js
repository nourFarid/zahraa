const authController = require ("./controller/registration.js")
const express = require('express')
const router = express.Router()

router.post('/signUp',authController.signUp)
router.post('/signUpAdmin',authController.signUpAdmin)
router.post('/signIn',authController.signIn)


module.exports = router